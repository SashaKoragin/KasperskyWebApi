import { MatTableDataSource } from "@angular/material/table";
import { MotherВoard } from "src/app/Api/ModelServer/ModelServer";
import { Cpu, Ram, VideoCard, SoundCard, NetworkAdapter, Monitor, TypesDevices, Storage, OpticalDriver } from '../../../Api/ModelServer/ModelServer';

export class AllModelDevice {

  public isVisibleModel: boolean = false;

  public MotherBoardLabel: string = "Материнская плата";
  public disPlayColumnsMotherBoard = ['dev_name', 'dev_descr', 'dev_manuf', 'BiosManuf', 'BiosVersion', 'BiosSerialNum', 'BiosReleaseDate'];
  public dataSourceMotherBoard: MatTableDataSource<MotherВoard> = new MatTableDataSource<MotherВoard>();

  public CpuLabel: string = "Процессор";
  public disPlayColumnsCpu = ['dev_name', 'dev_descr', 'dev_manuf', 'CpuSpeed', 'CpuCores', 'CpuThreads'];
  public dataSourceCpu: MatTableDataSource<Cpu> = new MatTableDataSource<Cpu>();

  public RamLabel: string = "Оперативная память";
  public disPlayColumnsRam = ['dev_name', 'dev_descr', 'dev_manuf', 'dev_xpar3', 'dev_xpar2'];
  public dataSourceRam: MatTableDataSource<Ram> = new MatTableDataSource<Ram>();

  public StorageLabel: string = "Хранилище данных устройства";
  public disPlayColumnsStorage = ['dev_name', 'dev_descr', 'dev_manuf', 'dev_xpar2', 'dev_xpar3', 'StorageRotationRate', 'SerialNum'];
  public dataSourceStorage: MatTableDataSource<Storage> = new MatTableDataSource<Storage>();

  public VideoCardLabel: string = "Видеокарта";
  public disPlayColumnsVideoCard = ['dev_name', 'dev_descr', 'dev_manuf', 'drv_ver', 'drv_prov', 'VideoCardMemorySize'];
  public dataSourceVideoCard: MatTableDataSource<VideoCard> = new MatTableDataSource<VideoCard>();

  public SoundCardLabel: string = "Звуковая плата";
  public disPlayColumnsSoundCard = ['dev_name', 'dev_descr', 'dev_manuf', 'drv_ver', 'drv_prov', 'SoundCardCodec'];
  public dataSourceSoundCard: MatTableDataSource<SoundCard> = new MatTableDataSource<SoundCard>();

  public NetworkAdapterLabel: string = "Сетевой контроллер";
  public disPlayColumnsNetworkAdapter = ['dev_name', 'dev_descr', 'dev_manuf', 'dev_xpar1', 'dev_xpar2'];
  public dataSourceNetworkAdapter: MatTableDataSource<NetworkAdapter> = new MatTableDataSource<NetworkAdapter>();

  public MonitorLabel: string = "Монитор";
  public disPlayColumnsMonitor = ['dev_name', 'dev_descr', 'dev_manuf', 'drv_ver', 'drv_prov', 'dev_xpar1'];
  public dataSourceMonitor: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();

  public OpticalDriverLabel: string = "Привод оптических дисков";
  public disPlayColumnsOpticalDriver = ['dev_name', 'dev_descr', 'dev_manuf', 'drv_ver', 'drv_prov'];
  public dataSourceOpticalDriver: MatTableDataSource<OpticalDriver> = new MatTableDataSource<OpticalDriver>();

  public addDataSourse(typesDevices: TypesDevices) {

    this.dataSourceMotherBoard.data = typesDevices.MotherВoard;
    this.dataSourceCpu.data = typesDevices.Cpu;
    this.dataSourceRam.data = typesDevices.Ram;
    this.dataSourceStorage.data = typesDevices.Storage;
    this.dataSourceVideoCard.data = typesDevices.VideoCard;
    this.dataSourceSoundCard.data = typesDevices.SoundCard;
    this.dataSourceNetworkAdapter.data = typesDevices.NetworkAdapter;
    this.dataSourceMonitor.data = typesDevices.Monitor;
    this.dataSourceOpticalDriver.data = typesDevices.OpticalDriver;
    this.isVisibleModel = true;
  }

}
