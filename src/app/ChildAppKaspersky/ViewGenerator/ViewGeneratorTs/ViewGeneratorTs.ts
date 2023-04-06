import { Component, OnInit, Injectable, ViewChild, AfterViewInit} from '@angular/core';
import { IsFilterModel, MemoView, SchemeModel, TypeFilters } from '../../../Api/ModelServer/ModelServer';
import { BehaviorSubject, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { ModelGetPostKaspersky } from '../../../Api/RequestService/RequestService';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';




/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item!: IsFilterModel;
  level!: number;
  expandable!: boolean;
}

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<IsFilterModel[]>([]);

  get data(): IsFilterModel[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data: IsFilterModel[] = [];
    this.dataChange.next(data);
  }


  insertItem(parent: IsFilterModel, isChild: boolean = false, memoView: MemoView = new MemoView()) {
    if (isChild) {
      parent.MemoView.push(memoView)
      this.dataChange.next(this.data);
      return memoView;
    }
    if (this.data.length !== 1) {
      this.data.push(parent)
      this.dataChange.next(this.data);
      return;
    }
    else {
      alert("Корневое добавление не возможно по правилам выборки!")
      return;
    }
  }

  clearAll() {
    this.data.pop();
    this.dataChange.next(this.data);
  }

  updateItem() {
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'viewGenerator',
  templateUrl: '../ViewGeneratorHtml/ViewGeneratorHtml.html',
  styleUrls: ['../ViewGeneratorCss/ViewGeneratorCss.css'],
  providers: [ModelGetPostKaspersky, ChecklistDatabase]
})

export class ViewGenerator implements OnInit, AfterViewInit {

  @ViewChild('singleSelectMemoView', { static: true }) singleSelectMemoView: MatSelect | undefined;

  @ViewChild('singleSelectFilterType', { static: true }) singleSelectFilterType: MatSelect | undefined;

  @ViewChild('singleSelectSchemeModel', { static: true }) singleSelectSchemeModel: MatSelect | undefined;

  buildString: string | null = null;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, IsFilterModel>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<IsFilterModel, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<IsFilterModel, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<IsFilterModel, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(public getPostModel: ModelGetPostKaspersky, private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.treeControl
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }
  ngAfterViewInit(): void {

  }

  public async ngOnInit(): Promise<void> {
    await this.getPostModel.getAllInfoModelView();
    await this.getPostModel.getFiltersKaspersky();
    this.selectModelMethod();
    this.filterAdd();
  }


  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: IsFilterModel): IsFilterModel[] => node.ModelFilters;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item.ModelFilters.length > 0;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: IsFilterModel, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node ? existingNode : new TodoItemFlatNode();
    flatNode.item = node;
    flatNode.level = level;
    flatNode.expandable = !!node.ModelFilters?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }



  public addRoot(isAndOr: boolean, nameCondition: string) {
    var IsSelect = new IsFilterModel();
    IsSelect.IsAndOr = isAndOr;
    IsSelect.NameCondition = nameCondition;
    IsSelect.MemoView = [];
    IsSelect.ModelFilters = [];
    this._database.insertItem(IsSelect!, false);
  }

  public async addRootChild(node: TodoItemFlatNode) {
    if (this.isEdit) {
      alert("Нельзя добавлять условие не отредактировав предыдущее!")
      return;
    }
    const parentNode = this.flatNodeMap.get(node);
    var model = this._database.insertItem(parentNode!, true);
    this.edit(model!);
    this.treeControl.expand(node);
  }


  /** Select the category so we can insert the new item. */
  public addChildRoot(node: TodoItemFlatNode, isAndOr: boolean, nameCondition: string) {
    const parentNode = this.flatNodeMap.get(node);
    var IsSelect = new IsFilterModel();
    IsSelect.IsAndOr = isAndOr;
    IsSelect.NameCondition = nameCondition;
    IsSelect.MemoView = [];
    IsSelect.ModelFilters = [];
    parentNode!.ModelFilters.push(IsSelect)
    this._database.updateItem();
    this.treeControl.expand(node);
  }

  public clearAll() {
    this._database.clearAll();
  }

  public generateDataToStringModel() {
    this.getPostModel.model.Model.ModelFilters = this._database.data;
    this.buildString = JSON.stringify(this.getPostModel.model.Model);
  }

  public generateFilters() {
    this.getPostModel.postGenerateFilters(this.getPostModel.model.Model).subscribe((model) => {
      alert(model);
    });;
  }

  public postViewKaspersky() {
    this.getPostModel.postViewKaspersky(this.getPostModel.model.Model).subscribe((model) => {
      console.log(model);
    });;
  }

  public reportServerKaspersky() {
    this.getPostModel.postViewKasperskyStreamExcel(this.getPostModel.model.Model);
  }




  public model: MemoView = new MemoView();
  isEdit!: boolean;


  modelCancelError: MemoView = new MemoView();

  public countRow: FormControl<number | null> = new FormControl<number | null>(null, Validators.required);

  public modelMemoView: MemoView[] = [];
  public memoViewCtrl: FormControl<MemoView | null> = new FormControl<MemoView | null>(null);
  public memoViewFilterCtrl: FormControl<string | null> = new FormControl<string | null>('');
  public filteredMemoView: ReplaySubject<MemoView[]> = new ReplaySubject<MemoView[]>(1);

  public modelFilter: TypeFilters[] = [];
  public filterCtrl: FormControl<TypeFilters | null> = new FormControl<TypeFilters | null>(null, Validators.required);
  public filterFilterCtrl: FormControl<string | null> = new FormControl<string | null>('');
  public filteredFilter: ReplaySubject<TypeFilters[]> = new ReplaySubject<TypeFilters[]>(1);

  public modelSchemeModel: SchemeModel[] = [];
  public modelSchemeModelCtrl: FormControl<SchemeModel | null> = new FormControl<SchemeModel | null>(null, Validators.required);
  public modelSchemeModelFilterCtrl: FormControl<string | null> = new FormControl<string | null>('');
  public modelSchemeModelFilter: ReplaySubject<SchemeModel[]> = new ReplaySubject<SchemeModel[]>(1);


  public filterAdd() {
    this.modelFilter = JSON.parse(JSON.stringify(this.getPostModel.model.TypeFilters));
    this.modelSchemeModel = JSON.parse(JSON.stringify(this.getPostModel.model.SchemeModels));
    this.modelSchemeModelCtrl.setValue(this.modelSchemeModel[0]);
    this.modelSchemeModelFilter.next(this.modelSchemeModel.slice());
    this.modelSchemeModelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSchemeModel();
      });
  }

  protected _onDestroy = new Subject<void>();
  public callBackFilterAll(): void {
    this.memoViewCtrl.setValue(this.modelMemoView[0]);
    this.filteredMemoView.next(this.modelMemoView.slice());
    this.memoViewFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMemoView();
      });
    this.filterCtrl.setValue(this.modelFilter[0]);
    this.filteredFilter.next(this.modelFilter.slice());
    this.filterFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterFiltered();
      });
  }

  public async edit(model: MemoView) {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.isEditAndAddTrue();
  }

  public async save(node: TodoItemFlatNode, model: MemoView) {
    this.model.ModelIsEdit = false;
    node.item.MemoView[node.item.MemoView.indexOf(model)] = JSON.parse(JSON.stringify(this.model));
    this.isEditAndAddFalse();
  }


  public cancel(node: TodoItemFlatNode, model: MemoView) {
    this.modelCancelError.ModelIsEdit = false;
    node.item.MemoView[node.item.MemoView.indexOf(model)] = JSON.parse(JSON.stringify(this.modelCancelError));
    this.isEditAndAddFalse();
  }

  public delete(node: TodoItemFlatNode, model: MemoView) {
    let index: number = node.item.MemoView.indexOf(model);
    node.item.MemoView.splice(index, 1);
  }

  public async selectModelMethodModel(model: SchemeModel) {
    if (model.NameSchemeView) {
      await this.getPostModel.getSchemeKaspersky(model.NameSchemeView)
      this.selectModelMethod();
    }
  }


  public selectModelMethod() {
    this.modelMemoView = JSON.parse(JSON.stringify(this.getPostModel.model.Model.MemoView));
    this.callBackFilterAll();
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
  }

  isEditAndAddFalse(): void {
    this.isEdit = false;
  }

  protected filterMemoView() {
    if (!this.modelMemoView) {
      return;
    }
    // get the search keyword
    let search = this.memoViewFilterCtrl.value;
    if (!search) {
      this.filteredMemoView.next(this.modelMemoView.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMemoView.next(
      this.modelMemoView.filter(memoView => memoView.Memo!.toLowerCase().indexOf(search!) > -1)
    );
  }

  protected filterFiltered() {
    if (!this.modelFilter) {
      return;
    }
    // get the search keyword
    let search = this.filterFilterCtrl.value;
    if (!search) {
      this.filteredFilter.next(this.modelFilter.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFilter.next(
      this.modelFilter.filter(typeFilter => typeFilter.FilterTypeText!.toLowerCase().indexOf(search!) > -1)
    );
  }

  protected filterSchemeModel() {
    if (!this.modelSchemeModel) {
      return;
    }
    let search = this.modelSchemeModelFilterCtrl.value;
    if (!search) {
      this.modelSchemeModelFilter.next(this.modelSchemeModel.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.modelSchemeModelFilter.next(
      this.modelSchemeModel.filter(nameScheme => nameScheme.NameSchemeView!.toLowerCase().indexOf(search!) > -1)
    );
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }
}

