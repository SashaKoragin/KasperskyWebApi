export class Identification {
  public loginField?: string;
  public passwordField?: string;
  public nameField?: string = '';
  public groupRuleServerField: string[] = [];
  public isErrorField?: boolean = false;
  public errorMessageField: string = '';
}

export class ModelWebKaspersky {
  public ModelHost!: ModelHost[];
  public TypesDevices!: TypesDevices;
}


export class SettingScheme {
  public SchemeModels!: SchemeModel[];
  public SchemeModel: SchemeModel = new SchemeModel();
  public Model: ModelView = new ModelView();
  public TypeFilters: TypeFilters[] = [];
}


export class SchemeModel {
  public NameSchemeView!: string;
  public InfoSchemeView!: string;
}


export class ModelView {
  public NameSchemeView: string = '';
  public CountDataBase: number = 0;
  public MemoView: MemoView[] = [];
  public ModelFilters: IsFilterModel[] = [];
}

export class IsFilterModel {
  public ModelFilters!: IsFilterModel[];
  public IsAndOr!: boolean;  //True И False Или
  public NameCondition!: string;
  public MemoView!: MemoView[];
}

export class MemoView {
  public Memo?: string | null = null;
  public TypeMemo: string | null = null;
  public Description: string | null = null;
  public FilterType: TypeFilters | null = null;
  public ValueMemo: string | null = null;
  public IsNot: boolean | null = null;
  public IsVisible: boolean | undefined | null = null;
  public IsValidMemoModel: boolean = true; //Валидация значения модели
  public ModelIsEdit: boolean = true;
}

export class TypeFilters {
  public FilterTypeIndex!: number;
  public FilterTypeText!: string;
  public FilterLogicSymbol!: string;
  public FilterLogicText!: string;
}

export class ModelHost {
  public KLHST_WKS_DN!: string;
  public KLHST_WKS_HOSTNAME!: string;
  public KLHST_INSTANCEID!: string;
  public KLHST_WKS_WINHOSTNAME!: string;
  public KLHST_WKS_WINDOMAIN!: string;
  public LHST_WKS_DNSDOMAIN!: string;
  public KLHST_WKS_DNSNAME!: string;
  public KLHST_WKS_IP_LONG!: string;
  public KLHST_WKS_FQDN!: string;
  public KLHST_PRCST_PRODUCT_NAME!: string;
  public KLHST_PRCST_PRODUCT_VERSION!: string;
}

export class TypesDevices {
  public KLHST_WKS_DN!: string;
  public kLHST_WKS_HOSTNAME!: string;
  public MotherВoard!: MotherВoard[];
  public Cpu!: Cpu[];
  public Ram!: Ram[];
  public Storage!: Storage[];
  public VideoCard!: VideoCard[];
  public SoundCard!: SoundCard[];
  public NetworkAdapter!: NetworkAdapter[];
  public Monitor!: Monitor[];
  public OpticalDriver!: OpticalDriver[];

}

export class MotherВoard {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public BiosManuf!: string;
  public BiosVersion!: string;
  public BiosSerialNum!: string;
  public BiosReleaseDate!: string;
}

export class Cpu {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public CpuSpeed!: number;
  public CpuCores!: number;
  public CpuThreads!: number;
}

export class Ram {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public dev_xpar2!: number;
  public dev_xpar3!: number;
}

export class Storage {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public dev_xpar2!: number;
  public dev_xpar3!: number;
  public SerialNum!: string;
  public StorageRotationRate!: number;
}

export class VideoCard {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public drv_prov!: string;
  public drv_ver!: string;
  public VideoCardMemorySize!: number;
}

export class SoundCard {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public drv_prov!: string;
  public drv_ver!: string;
  public SoundCardCodec!: string
}

export class NetworkAdapter {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public dev_xpar1!: string;
  public dev_xpar2!: number;
}

export class Monitor {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public drv_prov!: string;
  public drv_ver!: string;
  public dev_xpar1!: string;
  public SerialNum!: string;
}

export class OpticalDriver {
  public dev_id!: string;
  public dev_type!: number;
  public dev_name!: string;
  public dev_descr!: string;
  public dev_manuf!: string;
  public drv_prov!: string;
  public drv_ver!: string;
}
