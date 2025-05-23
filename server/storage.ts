import { 
  users, type User, type InsertUser, 
  waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry,
  coalServices, type CoalService, type InsertCoalService,
  servicePages, type ServicePage, type InsertServicePage,
  consultationRequests, type ConsultationRequest, type InsertConsultationRequest,
  testingAgencies, type TestingAgency, type InsertTestingAgency,
  testingItems, type TestingItem, type InsertTestingItem,
  testingRecords, type TestingRecord, type InsertTestingRecord,
  coalProducts, type CoalProduct, type InsertCoalProduct,
  coalBids, type CoalBid, type InsertCoalBid,
  coalOrders, type CoalOrder, type InsertCoalOrder,
  coalFavorites, type CoalFavorite, type InsertCoalFavorite,
  collateralFinancingApplications, type CollateralFinancingApplication, type InsertCollateralFinancingApplication,
  transportOrders, type TransportOrder, type InsertTransportOrder,
  transportDrivers, type TransportDriver, type InsertTransportDriver,
  transportVehicles, type TransportVehicle, type InsertTransportVehicle,
  transportTracking, type TransportTracking, type InsertTransportTracking
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist methods
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
  
  // Coal Services methods
  createCoalService(service: InsertCoalService): Promise<CoalService>;
  getCoalServiceById(id: number): Promise<CoalService | undefined>;
  getCoalServiceBySlug(slug: string): Promise<CoalService | undefined>;
  getAllCoalServices(): Promise<CoalService[]>;
  updateCoalService(id: number, service: Partial<InsertCoalService>): Promise<CoalService | undefined>;
  
  // Service Pages methods
  createServicePage(page: InsertServicePage): Promise<ServicePage>;
  getServicePageById(id: number): Promise<ServicePage | undefined>;
  getServicePageBySlug(slug: string): Promise<ServicePage | undefined>;
  getServicePagesByServiceId(serviceId: number): Promise<ServicePage[]>;
  getAllServicePages(): Promise<ServicePage[]>;
  updateServicePage(id: number, page: Partial<InsertServicePage>): Promise<ServicePage | undefined>;
  
  // Consultation Requests methods
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequestById(id: number): Promise<ConsultationRequest | undefined>;
  getAllConsultationRequests(): Promise<ConsultationRequest[]>;
  updateConsultationRequestStatus(id: number, status: string): Promise<ConsultationRequest | undefined>;
  
  // Collateral Financing Application methods (煤品货押融资申请)
  createCollateralFinancingApplication(application: InsertCollateralFinancingApplication): Promise<CollateralFinancingApplication>;
  getCollateralFinancingApplicationById(id: number): Promise<CollateralFinancingApplication | undefined>;
  getCollateralFinancingApplicationsByEmail(email: string): Promise<CollateralFinancingApplication[]>;
  getAllCollateralFinancingApplications(): Promise<CollateralFinancingApplication[]>;
  updateCollateralFinancingApplicationStatus(id: number, status: string): Promise<CollateralFinancingApplication | undefined>;
  
  // Testing Agency methods
  createTestingAgency(agency: InsertTestingAgency): Promise<TestingAgency>;
  getTestingAgencyById(id: number): Promise<TestingAgency | undefined>;
  getTestingAgencyByCode(code: string): Promise<TestingAgency | undefined>;
  getAllTestingAgencies(): Promise<TestingAgency[]>;
  updateTestingAgency(id: number, agency: Partial<InsertTestingAgency>): Promise<TestingAgency | undefined>;
  
  // Testing Item methods
  createTestingItem(item: InsertTestingItem): Promise<TestingItem>;
  getTestingItemById(id: number): Promise<TestingItem | undefined>;
  getTestingItemByCode(code: string): Promise<TestingItem | undefined>;
  getAllTestingItems(): Promise<TestingItem[]>;
  updateTestingItem(id: number, item: Partial<InsertTestingItem>): Promise<TestingItem | undefined>;
  
  // Testing Record methods
  createTestingRecord(record: InsertTestingRecord): Promise<TestingRecord>;
  getTestingRecordById(id: number): Promise<TestingRecord | undefined>;
  getTestingRecordsBySampleId(sampleId: string): Promise<TestingRecord[]>;
  getTestingRecordsByAgencyId(agencyId: number): Promise<TestingRecord[]>;
  getTestingRecordsByUserId(userId: number): Promise<TestingRecord[]>;
  getAllTestingRecords(): Promise<TestingRecord[]>;
  updateTestingRecord(id: number, record: Partial<InsertTestingRecord>): Promise<TestingRecord | undefined>;
  
  // Calculate Weighted Average for Testing Results
  calculateWeightedAverage(testingRecordId: number): Promise<object | undefined>;
  
  // Coal Product methods (煤险处置 - 煤炭产品)
  createCoalProduct(product: InsertCoalProduct): Promise<CoalProduct>;
  getCoalProductById(id: number): Promise<CoalProduct | undefined>;
  getCoalProductByCode(productCode: string): Promise<CoalProduct | undefined>;
  getAllCoalProducts(): Promise<CoalProduct[]>;
  getCoalProductsByDisposalType(disposalType: string): Promise<CoalProduct[]>;
  getCoalProductsByStatus(status: string): Promise<CoalProduct[]>;
  getCoalProductsByRiskLevel(riskLevel: string): Promise<CoalProduct[]>;
  updateCoalProduct(id: number, product: Partial<InsertCoalProduct>): Promise<CoalProduct | undefined>;
  updateCoalProductStatus(id: number, status: string): Promise<CoalProduct | undefined>;
  
  // Coal Bid methods (煤险处置 - 竞拍出价)
  createCoalBid(bid: InsertCoalBid): Promise<CoalBid>;
  getCoalBidById(id: number): Promise<CoalBid | undefined>;
  getCoalBidsByProductId(productId: number): Promise<CoalBid[]>;
  getCoalBidsByUserId(userId: number): Promise<CoalBid[]>;
  getHighestBidForProduct(productId: number): Promise<CoalBid | undefined>;
  updateCoalBidStatus(id: number, status: string): Promise<CoalBid | undefined>;
  
  // Coal Order methods (煤险处置 - 煤炭订单)
  createCoalOrder(order: InsertCoalOrder): Promise<CoalOrder>;
  getCoalOrderById(id: number): Promise<CoalOrder | undefined>;
  getCoalOrderByOrderNumber(orderNumber: string): Promise<CoalOrder | undefined>;
  getCoalOrdersByProductId(productId: number): Promise<CoalOrder[]>;
  getCoalOrdersByUserId(userId: number): Promise<CoalOrder[]>;
  getAllCoalOrders(): Promise<CoalOrder[]>;
  updateCoalOrderStatus(id: number, paymentStatus: string, deliveryStatus: string): Promise<CoalOrder | undefined>;
  
  // Coal Favorites methods (煤险处置 - 收藏夹)
  createCoalFavorite(favorite: InsertCoalFavorite): Promise<CoalFavorite>;
  getCoalFavoriteById(id: number): Promise<CoalFavorite | undefined>;
  getCoalFavoritesByUserId(userId: number): Promise<CoalFavorite[]>;
  removeCoalFavorite(id: number): Promise<boolean>;
  isProductFavoritedByUser(productId: number, userId: number | null | undefined): Promise<boolean>;
  
  // Transport Order methods (煤炭运输 - 运输订单)
  createTransportOrder(order: InsertTransportOrder): Promise<TransportOrder>;
  getTransportOrderById(id: number): Promise<TransportOrder | undefined>;
  getTransportOrderByOrderNumber(orderNumber: string): Promise<TransportOrder | undefined>;
  getTransportOrdersByUserId(userId: number): Promise<TransportOrder[]>;
  getAllTransportOrders(): Promise<TransportOrder[]>;
  getTransportOrdersByStatus(status: string): Promise<TransportOrder[]>;
  getTransportOrdersByDriverId(driverId: number): Promise<TransportOrder[]>;
  updateTransportOrderStatus(id: number, status: string): Promise<TransportOrder | undefined>;
  updateTransportOrder(id: number, order: Partial<InsertTransportOrder>): Promise<TransportOrder | undefined>;
  assignDriver(orderId: number, driverId: number, vehicleId: number): Promise<TransportOrder | undefined>;
  
  // Transport Driver methods (煤炭运输 - 司机管理)
  createTransportDriver(driver: InsertTransportDriver): Promise<TransportDriver>;
  getTransportDriverById(id: number): Promise<TransportDriver | undefined>;
  getTransportDriverByCode(driverCode: string): Promise<TransportDriver | undefined>;
  getAllTransportDrivers(): Promise<TransportDriver[]>;
  getAvailableTransportDrivers(): Promise<TransportDriver[]>;
  updateTransportDriverStatus(id: number, status: string): Promise<TransportDriver | undefined>;
  updateTransportDriver(id: number, driver: Partial<InsertTransportDriver>): Promise<TransportDriver | undefined>;
  
  // Transport Vehicle methods (煤炭运输 - 车辆管理)
  createTransportVehicle(vehicle: InsertTransportVehicle): Promise<TransportVehicle>;
  getTransportVehicleById(id: number): Promise<TransportVehicle | undefined>;
  getTransportVehicleByCode(vehicleCode: string): Promise<TransportVehicle | undefined>;
  getAllTransportVehicles(): Promise<TransportVehicle[]>;
  getAvailableTransportVehicles(): Promise<TransportVehicle[]>;
  updateTransportVehicleStatus(id: number, status: string): Promise<TransportVehicle | undefined>;
  updateTransportVehicle(id: number, vehicle: Partial<InsertTransportVehicle>): Promise<TransportVehicle | undefined>;
  
  // Transport Tracking methods (煤炭运输 - 运输跟踪)
  createTransportTracking(tracking: InsertTransportTracking): Promise<TransportTracking>;
  getTransportTrackingById(id: number): Promise<TransportTracking | undefined>;
  getTransportTrackingsByOrderId(orderId: number): Promise<TransportTracking[]>;
  getLatestTransportTrackingByOrderId(orderId: number): Promise<TransportTracking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, WaitlistEntry>;
  private coalServices: Map<number, CoalService>;
  private servicePages: Map<number, ServicePage>;
  private consultationRequests: Map<number, ConsultationRequest>;
  private testingAgencies: Map<number, TestingAgency>;
  private testingItems: Map<number, TestingItem>;
  private testingRecords: Map<number, TestingRecord>;
  private transportOrders: Map<number, TransportOrder>;
  private transportDrivers: Map<number, TransportDriver>;
  private transportVehicles: Map<number, TransportVehicle>;
  private transportTracking: Map<number, TransportTracking>;
  
  currentUserId: number;
  currentWaitlistId: number;
  currentCoalServiceId: number;
  currentServicePageId: number;
  currentConsultationRequestId: number;
  currentTestingAgencyId: number;
  currentTestingItemId: number;
  currentTestingRecordId: number;
  currentTransportOrderId: number;
  currentTransportDriverId: number;
  currentTransportVehicleId: number;
  currentTransportTrackingId: number;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.coalServices = new Map();
    this.servicePages = new Map();
    this.consultationRequests = new Map();
    this.testingAgencies = new Map();
    this.testingItems = new Map();
    this.testingRecords = new Map();
    this.collateralFinancingApplications = new Map();
    this.transportOrders = new Map();
    this.transportDrivers = new Map();
    this.transportVehicles = new Map();
    this.transportTracking = new Map();
    
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
    this.currentCoalServiceId = 1;
    this.currentServicePageId = 1;
    this.currentConsultationRequestId = 1;
    this.currentTestingAgencyId = 1;
    this.currentTestingItemId = 1;
    this.currentTestingRecordId = 1;
    this.currentCollateralFinancingApplicationId = 1;
    this.currentTransportOrderId = 1;
    this.currentTransportDriverId = 1;
    this.currentTransportVehicleId = 1;
    this.currentTransportTrackingId = 1;
    
    // Initialize with coal services and testing data
    this.initializeCoalServices();
    this.initializeTestingItems();
    // 初始化一些示例司机和车辆数据
    this.initializeTransportDriversAndVehicles();
  }

  // Initialize common testing items for coal
  private async initializeTestingItems() {
    const testingItems = [
      {
        code: "CV",
        nameEn: "Calorific Value",
        nameCn: "热值",
        descriptionEn: "The amount of heat released during the complete combustion of coal.",
        descriptionCn: "煤炭完全燃烧时释放的热量。",
        unit: "kcal/kg",
        minValue: "4500",
        maxValue: "7500",
        standardValue: "6000"
      },
      {
        code: "MT",
        nameEn: "Moisture Total",
        nameCn: "全水分",
        descriptionEn: "The total moisture content in coal as received.",
        descriptionCn: "收到基煤炭中的总水分含量。",
        unit: "%",
        minValue: "5",
        maxValue: "40",
        standardValue: "12"
      },
      {
        code: "ASH",
        nameEn: "Ash Content",
        nameCn: "灰分",
        descriptionEn: "The non-combustible residue left after coal is burnt.",
        descriptionCn: "煤炭燃烧后的不可燃残渣。",
        unit: "%",
        minValue: "5",
        maxValue: "30",
        standardValue: "10"
      },
      {
        code: "VM",
        nameEn: "Volatile Matter",
        nameCn: "挥发分",
        descriptionEn: "Components of coal, except for moisture, which are liberated at high temperature in the absence of air.",
        descriptionCn: "除水分外，在缺氧高温条件下释放的煤炭成分。",
        unit: "%",
        minValue: "15",
        maxValue: "45",
        standardValue: "28"
      },
      {
        code: "FC",
        nameEn: "Fixed Carbon",
        nameCn: "固定碳",
        descriptionEn: "The carbon remaining after volatile materials are driven off.",
        descriptionCn: "挥发物质驱除后剩余的碳。",
        unit: "%",
        minValue: "30",
        maxValue: "80",
        standardValue: "50"
      },
      {
        code: "S",
        nameEn: "Sulfur Content",
        nameCn: "硫含量",
        descriptionEn: "The amount of sulfur in coal, which affects environmental emissions and equipment corrosion.",
        descriptionCn: "煤炭中的硫含量，影响环境排放和设备腐蚀。",
        unit: "%",
        minValue: "0.1",
        maxValue: "5",
        standardValue: "0.8"
      }
    ];

    for (const item of testingItems) {
      await this.createTestingItem(item as InsertTestingItem);
    }
  }

  private async initializeCoalServices() {
    const services = [
      {
        slug: "storage-monitoring",
        icon: "src/assets/images/coal-storage.svg",
        nameEn: "Coal Storage Monitoring Services",
        nameCn: "煤仓监管服务",
        descriptionEn: "Real-time monitoring of coal stockpiles to prevent losses and ensure security.",
        descriptionCn: "利用先进技术实时监测煤炭库存，防止损失并确保安全。",
        featuresEn: JSON.stringify(["Real-time monitoring", "Security alerts", "Inventory management", "Temperature monitoring", "AI-powered cameras", "Access control"]),
        featuresCn: JSON.stringify(["实时监控", "安全警报", "库存管理", "温度监测", "AI智能摄像", "出入控制"]),
      },
      {
        slug: "weight-estimation",
        icon: "src/assets/images/weight-estimation.svg",
        nameEn: "Coal Weight Estimation Services",
        nameCn: "煤重估量服务",
        descriptionEn: "Precision 3D modeling for accurate coal stockpile weight estimation.",
        descriptionCn: "精确的3D建模，用于准确估算煤炭堆的重量。",
        featuresEn: JSON.stringify(["3D modeling", "Precision measurement", "Volume calculation", "Drone surveys", "AI analysis", "Regular reporting"]),
        featuresCn: JSON.stringify(["3D建模", "精密测量", "体积计算", "无人机测量", "AI分析", "定期报告"]),
      },
      {
        slug: "price-estimation",
        icon: "src/assets/images/price-estimation.svg",
        nameEn: "Coal Price Estimation Services",
        nameCn: "煤价估算服务",
        descriptionEn: "Market-driven coal pricing estimates based on quality and market conditions.",
        descriptionCn: "基于质量和市场条件的煤炭价格智能预测分析。",
        featuresEn: JSON.stringify(["Market analysis", "Price forecasting", "Quality-based pricing", "Historical trends", "Futures market data", "Custom price reports"]),
        featuresCn: JSON.stringify(["市场分析", "价格预测", "基于质量的定价", "历史趋势", "期货市场数据", "定制价格报告"]),
      },
      {
        slug: "product-collateral",
        icon: "src/assets/images/product-collateral.svg",
        nameEn: "Coal Product Collateral Services",
        nameCn: "煤品货押服务",
        descriptionEn: "Comprehensive collateral valuation services for coal products.",
        descriptionCn: "煤炭产品的综合抵押估值服务，安全便捷。",
        featuresEn: JSON.stringify(["Asset valuation", "Collateral management", "Documentation", "Secure storage", "Real-time monitoring", "Insurance options"]),
        featuresCn: JSON.stringify(["资产评估", "抵押品管理", "文档记录", "安全存储", "实时监控", "保险选择"]),
      },
      {
        slug: "transport",
        icon: "src/assets/images/transport.svg",
        nameEn: "Coal Transport Services",
        nameCn: "煤炭运输服务",
        descriptionEn: "Efficient logistics solutions for coal transportation needs.",
        descriptionCn: "高效可靠的煤炭运输物流解决方案。",
        featuresEn: JSON.stringify(["Route optimization", "Fleet management", "Delivery tracking", "Multimodal options", "Emergency delivery", "Customs clearance"]),
        featuresCn: JSON.stringify(["路线优化", "车队管理", "交付跟踪", "多式联运", "紧急运输", "海关清关"]),
      },
      {
        slug: "quality-testing",
        icon: "src/assets/icons/quality-testing-icon.svg",
        nameEn: "Coal Quality Testing Services",
        nameCn: "煤质检测服务",
        descriptionEn: "Advanced laboratory testing for coal quality assurance.",
        descriptionCn: "先进的实验室测试，确保煤炭质量达标。",
        featuresEn: JSON.stringify(["Chemical analysis", "Heat value testing", "Compliance certification", "International standards", "Rapid results", "Detailed reports"]),
        featuresCn: JSON.stringify(["化学分析", "热值测试", "合规认证", "国际标准", "快速结果", "详细报告"]),
      },
      {
        slug: "industry-consultation",
        icon: "src/assets/icons/consultation-icon.svg",
        nameEn: "Coal Industry Consultation Services",
        nameCn: "煤事咨询服务",
        descriptionEn: "Expert advice from industry professionals for coal-related businesses powered by AI.",
        descriptionCn: "结合人工智能技术，提供专业的煤炭行业专家建议。",
        featuresEn: JSON.stringify(["Market insights", "Operational efficiency", "Regulatory compliance", "AI-powered analysis", "Deepseek-R1 model", "24/7 availability"]),
        featuresCn: JSON.stringify(["市场洞察", "运营效率", "法规遵从", "AI驱动分析", "Deepseek-R1模型", "全天候服务"]),
      },
      {
        slug: "coal-risk-disposal",
        icon: "src/assets/icons/coal-risk-disposal-icon.svg",
        nameEn: "Coal Risk Disposal Services",
        nameCn: "煤险处置服务",
        descriptionEn: "Professional platform for coal collateral risk management and asset disposal through auctions and targeted pricing.",
        descriptionCn: "专业的煤炭抵押风险管理和资产处置平台，通过竞拍和定向降价实现最优处置。",
        featuresEn: JSON.stringify(["Collateral auction", "Risk assessment", "Price optimization", "Quality verification", "Purchase facilitation", "Secure transactions"]),
        featuresCn: JSON.stringify(["抵押品竞拍", "风险评估", "价格优化", "质量验证", "购买便利化", "安全交易"]),
      }
    ];

    for (const service of services) {
      await this.createCoalService(service as InsertCoalService);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      role: insertUser.role || "user",
      createdAt 
    };
    this.users.set(id, user);
    return user;
  }

  // Waitlist methods
  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    // Check if email already exists
    const existingEntry = await this.getWaitlistEntryByEmail(insertEntry.email);
    if (existingEntry) {
      throw new Error("Email already registered on waitlist");
    }

    const id = this.currentWaitlistId++;
    // Create a properly typed entry without spreading insertEntry
    const entry: WaitlistEntry = { 
      id,
      name: insertEntry.name,
      email: insertEntry.email,
      company: insertEntry.company ?? null,
      serviceInterest: insertEntry.serviceInterest ?? null,
      message: insertEntry.message ?? null,
      createdAt: new Date() 
    };
    
    this.waitlist.set(id, entry);
    return entry;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlist.values()).find(
      (entry) => entry.email === email,
    );
  }

  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlist.values());
  }

  // Coal Services methods
  async createCoalService(service: InsertCoalService): Promise<CoalService> {
    const id = this.currentCoalServiceId++;
    const now = new Date();
    const coalService: CoalService = {
      ...service,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.coalServices.set(id, coalService);
    return coalService;
  }

  async getCoalServiceById(id: number): Promise<CoalService | undefined> {
    return this.coalServices.get(id);
  }

  async getCoalServiceBySlug(slug: string): Promise<CoalService | undefined> {
    return Array.from(this.coalServices.values()).find(
      (service) => service.slug === slug
    );
  }

  async getAllCoalServices(): Promise<CoalService[]> {
    return Array.from(this.coalServices.values());
  }

  async updateCoalService(id: number, service: Partial<InsertCoalService>): Promise<CoalService | undefined> {
    const existingService = await this.getCoalServiceById(id);
    if (!existingService) return undefined;

    const updatedService: CoalService = {
      ...existingService,
      ...service,
      updatedAt: new Date()
    };

    this.coalServices.set(id, updatedService);
    return updatedService;
  }

  // Service Pages methods
  async createServicePage(page: InsertServicePage): Promise<ServicePage> {
    const id = this.currentServicePageId++;
    const now = new Date();
    const servicePage: ServicePage = {
      id,
      serviceId: page.serviceId,
      slug: page.slug,
      titleEn: page.titleEn,
      titleCn: page.titleCn,
      contentEn: page.contentEn,
      contentCn: page.contentCn,
      imageUrl: page.imageUrl ?? null,
      metaDescription: page.metaDescription ?? null,
      isPublished: page.isPublished ?? true,
      createdAt: now,
      updatedAt: now
    };
    this.servicePages.set(id, servicePage);
    return servicePage;
  }

  async getServicePageById(id: number): Promise<ServicePage | undefined> {
    return this.servicePages.get(id);
  }

  async getServicePageBySlug(slug: string): Promise<ServicePage | undefined> {
    return Array.from(this.servicePages.values()).find(
      (page) => page.slug === slug
    );
  }

  async getServicePagesByServiceId(serviceId: number): Promise<ServicePage[]> {
    return Array.from(this.servicePages.values()).filter(
      (page) => page.serviceId === serviceId
    );
  }

  async getAllServicePages(): Promise<ServicePage[]> {
    return Array.from(this.servicePages.values());
  }

  async updateServicePage(id: number, page: Partial<InsertServicePage>): Promise<ServicePage | undefined> {
    const existingPage = await this.getServicePageById(id);
    if (!existingPage) return undefined;

    // Create a properly typed object
    const updatedPage: ServicePage = {
      ...existingPage,
      serviceId: page.serviceId ?? existingPage.serviceId,
      slug: page.slug ?? existingPage.slug,
      titleEn: page.titleEn ?? existingPage.titleEn,
      titleCn: page.titleCn ?? existingPage.titleCn,
      contentEn: page.contentEn ?? existingPage.contentEn,
      contentCn: page.contentCn ?? existingPage.contentCn,
      imageUrl: page.imageUrl !== undefined ? page.imageUrl : existingPage.imageUrl,
      metaDescription: page.metaDescription !== undefined ? page.metaDescription : existingPage.metaDescription,
      isPublished: page.isPublished !== undefined ? page.isPublished : existingPage.isPublished,
      updatedAt: new Date()
    };

    this.servicePages.set(id, updatedPage);
    return updatedPage;
  }

  // Consultation Requests methods
  async createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = this.currentConsultationRequestId++;
    const consultationRequest: ConsultationRequest = {
      id,
      name: request.name,
      email: request.email,
      company: request.company ?? null,
      phone: request.phone ?? null,
      serviceType: request.serviceType,
      message: request.message,
      status: "pending",
      createdAt: new Date()
    };
    this.consultationRequests.set(id, consultationRequest);
    return consultationRequest;
  }

  async getConsultationRequestById(id: number): Promise<ConsultationRequest | undefined> {
    return this.consultationRequests.get(id);
  }

  async getAllConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }

  async updateConsultationRequestStatus(id: number, status: string): Promise<ConsultationRequest | undefined> {
    const existingRequest = await this.getConsultationRequestById(id);
    if (!existingRequest) return undefined;

    const updatedRequest: ConsultationRequest = {
      ...existingRequest,
      status
    };

    this.consultationRequests.set(id, updatedRequest);
    return updatedRequest;
  }
  
  // Testing Agency methods
  async createTestingAgency(agency: InsertTestingAgency): Promise<TestingAgency> {
    // Check if code already exists
    const existingAgency = await this.getTestingAgencyByCode(agency.code);
    if (existingAgency) {
      throw new Error(`Testing agency with code ${agency.code} already exists`);
    }
    
    const id = this.currentTestingAgencyId++;
    const now = new Date();
    
    const testingAgency: TestingAgency = {
      id,
      code: agency.code,
      nameEn: agency.nameEn,
      nameCn: agency.nameCn,
      descriptionEn: agency.descriptionEn ?? null,
      descriptionCn: agency.descriptionCn ?? null,
      address: agency.address ?? null,
      contactPerson: agency.contactPerson ?? null,
      contactPhone: agency.contactPhone ?? null,
      contactEmail: agency.contactEmail ?? null,
      certifications: agency.certifications ?? null,
      apiEndpoint: agency.apiEndpoint ?? null,
      apiKey: agency.apiKey ?? null,
      isActive: agency.isActive ?? true,
      createdAt: now,
      updatedAt: now
    };
    
    this.testingAgencies.set(id, testingAgency);
    return testingAgency;
  }
  
  async getTestingAgencyById(id: number): Promise<TestingAgency | undefined> {
    return this.testingAgencies.get(id);
  }
  
  async getTestingAgencyByCode(code: string): Promise<TestingAgency | undefined> {
    return Array.from(this.testingAgencies.values()).find(
      (agency) => agency.code === code
    );
  }
  
  async getAllTestingAgencies(): Promise<TestingAgency[]> {
    return Array.from(this.testingAgencies.values());
  }
  
  async updateTestingAgency(id: number, agency: Partial<InsertTestingAgency>): Promise<TestingAgency | undefined> {
    const existingAgency = await this.getTestingAgencyById(id);
    if (!existingAgency) return undefined;
    
    const now = new Date();
    
    const updatedAgency: TestingAgency = {
      ...existingAgency,
      code: agency.code ?? existingAgency.code,
      nameEn: agency.nameEn ?? existingAgency.nameEn,
      nameCn: agency.nameCn ?? existingAgency.nameCn,
      descriptionEn: agency.descriptionEn !== undefined ? agency.descriptionEn : existingAgency.descriptionEn,
      descriptionCn: agency.descriptionCn !== undefined ? agency.descriptionCn : existingAgency.descriptionCn,
      address: agency.address !== undefined ? agency.address : existingAgency.address,
      contactPerson: agency.contactPerson !== undefined ? agency.contactPerson : existingAgency.contactPerson,
      contactPhone: agency.contactPhone !== undefined ? agency.contactPhone : existingAgency.contactPhone,
      contactEmail: agency.contactEmail !== undefined ? agency.contactEmail : existingAgency.contactEmail,
      certifications: agency.certifications !== undefined ? agency.certifications : existingAgency.certifications,
      apiEndpoint: agency.apiEndpoint !== undefined ? agency.apiEndpoint : existingAgency.apiEndpoint,
      apiKey: agency.apiKey !== undefined ? agency.apiKey : existingAgency.apiKey,
      isActive: agency.isActive !== undefined ? agency.isActive : existingAgency.isActive,
      updatedAt: now
    };
    
    this.testingAgencies.set(id, updatedAgency);
    return updatedAgency;
  }
  
  // Testing Item methods
  async createTestingItem(item: InsertTestingItem): Promise<TestingItem> {
    // Check if code already exists
    const existingItem = await this.getTestingItemByCode(item.code);
    if (existingItem) {
      throw new Error(`Testing item with code ${item.code} already exists`);
    }
    
    const id = this.currentTestingItemId++;
    const now = new Date();
    
    const testingItem: TestingItem = {
      id,
      code: item.code,
      nameEn: item.nameEn,
      nameCn: item.nameCn,
      descriptionEn: item.descriptionEn ?? null,
      descriptionCn: item.descriptionCn ?? null,
      unit: item.unit,
      minValue: item.minValue ?? null,
      maxValue: item.maxValue ?? null,
      standardValue: item.standardValue ?? null,
      createdAt: now,
      updatedAt: now
    };
    
    this.testingItems.set(id, testingItem);
    return testingItem;
  }
  
  async getTestingItemById(id: number): Promise<TestingItem | undefined> {
    return this.testingItems.get(id);
  }
  
  async getTestingItemByCode(code: string): Promise<TestingItem | undefined> {
    return Array.from(this.testingItems.values()).find(
      (item) => item.code === code
    );
  }
  
  async getAllTestingItems(): Promise<TestingItem[]> {
    return Array.from(this.testingItems.values());
  }
  
  async updateTestingItem(id: number, item: Partial<InsertTestingItem>): Promise<TestingItem | undefined> {
    const existingItem = await this.getTestingItemById(id);
    if (!existingItem) return undefined;
    
    const now = new Date();
    
    const updatedItem: TestingItem = {
      ...existingItem,
      code: item.code ?? existingItem.code,
      nameEn: item.nameEn ?? existingItem.nameEn,
      nameCn: item.nameCn ?? existingItem.nameCn,
      descriptionEn: item.descriptionEn !== undefined ? item.descriptionEn : existingItem.descriptionEn,
      descriptionCn: item.descriptionCn !== undefined ? item.descriptionCn : existingItem.descriptionCn,
      unit: item.unit ?? existingItem.unit,
      minValue: item.minValue !== undefined ? item.minValue : existingItem.minValue,
      maxValue: item.maxValue !== undefined ? item.maxValue : existingItem.maxValue,
      standardValue: item.standardValue !== undefined ? item.standardValue : existingItem.standardValue,
      updatedAt: now
    };
    
    this.testingItems.set(id, updatedItem);
    return updatedItem;
  }
  
  // Testing Record methods
  async createTestingRecord(record: InsertTestingRecord): Promise<TestingRecord> {
    const id = this.currentTestingRecordId++;
    const now = new Date();
    
    // Validate agency exists
    const agency = await this.getTestingAgencyById(record.agencyId);
    if (!agency) {
      throw new Error(`Testing agency with ID ${record.agencyId} does not exist`);
    }
    
    // Validate user exists if provided
    if (record.userId) {
      const user = await this.getUser(record.userId);
      if (!user) {
        throw new Error(`User with ID ${record.userId} does not exist`);
      }
    }
    
    const testingRecord: TestingRecord = {
      id,
      agencyId: record.agencyId,
      userId: record.userId ?? null,
      sampleId: record.sampleId,
      sampleDate: record.sampleDate,
      sampleLocation: record.sampleLocation ?? null,
      coalType: record.coalType ?? null,
      testDate: record.testDate,
      testReport: record.testReport ?? null,
      results: record.results,
      weightedResults: record.weightedResults ?? null,
      notes: record.notes ?? null,
      attachments: record.attachments ?? null,
      status: record.status ?? "completed",
      createdAt: now,
      updatedAt: now
    };
    
    this.testingRecords.set(id, testingRecord);
    
    // Calculate weighted average if results provided
    if (record.results && Array.isArray(record.results) && record.results.length > 0) {
      await this.calculateWeightedAverage(id);
    }
    
    return testingRecord;
  }
  
  async getTestingRecordById(id: number): Promise<TestingRecord | undefined> {
    return this.testingRecords.get(id);
  }
  
  async getTestingRecordsBySampleId(sampleId: string): Promise<TestingRecord[]> {
    return Array.from(this.testingRecords.values()).filter(
      (record) => record.sampleId === sampleId
    );
  }
  
  async getTestingRecordsByAgencyId(agencyId: number): Promise<TestingRecord[]> {
    return Array.from(this.testingRecords.values()).filter(
      (record) => record.agencyId === agencyId
    );
  }
  
  async getTestingRecordsByUserId(userId: number): Promise<TestingRecord[]> {
    return Array.from(this.testingRecords.values()).filter(
      (record) => record.userId === userId
    );
  }
  
  async getAllTestingRecords(): Promise<TestingRecord[]> {
    return Array.from(this.testingRecords.values());
  }
  
  async updateTestingRecord(id: number, record: Partial<InsertTestingRecord>): Promise<TestingRecord | undefined> {
    const existingRecord = await this.getTestingRecordById(id);
    if (!existingRecord) return undefined;
    
    const now = new Date();
    
    // Validate agency exists if changing
    if (record.agencyId && record.agencyId !== existingRecord.agencyId) {
      const agency = await this.getTestingAgencyById(record.agencyId);
      if (!agency) {
        throw new Error(`Testing agency with ID ${record.agencyId} does not exist`);
      }
    }
    
    // Validate user exists if changing
    if (record.userId && record.userId !== existingRecord.userId) {
      const user = await this.getUser(record.userId);
      if (!user) {
        throw new Error(`User with ID ${record.userId} does not exist`);
      }
    }
    
    const updatedRecord: TestingRecord = {
      ...existingRecord,
      agencyId: record.agencyId ?? existingRecord.agencyId,
      userId: record.userId !== undefined ? record.userId : existingRecord.userId,
      sampleId: record.sampleId ?? existingRecord.sampleId,
      sampleDate: record.sampleDate ?? existingRecord.sampleDate,
      sampleLocation: record.sampleLocation !== undefined ? record.sampleLocation : existingRecord.sampleLocation,
      coalType: record.coalType !== undefined ? record.coalType : existingRecord.coalType,
      testDate: record.testDate ?? existingRecord.testDate,
      testReport: record.testReport !== undefined ? record.testReport : existingRecord.testReport,
      results: record.results ?? existingRecord.results,
      weightedResults: record.weightedResults !== undefined ? record.weightedResults : existingRecord.weightedResults,
      notes: record.notes !== undefined ? record.notes : existingRecord.notes,
      attachments: record.attachments !== undefined ? record.attachments : existingRecord.attachments,
      status: record.status ?? existingRecord.status,
      updatedAt: now
    };
    
    this.testingRecords.set(id, updatedRecord);
    
    // Recalculate weighted average if results changed
    if (record.results) {
      await this.calculateWeightedAverage(id);
    }
    
    return updatedRecord;
  }
  
  // Calculate weighted average for test results
  async calculateWeightedAverage(testingRecordId: number): Promise<Record<string, number> | undefined> {
    const record = await this.getTestingRecordById(testingRecordId);
    if (!record || !record.results) return undefined;
    
    interface TestResult {
      itemCode: string;
      value: string | number;
      weight?: string | number;
    }
    
    const results = record.results as TestResult[];
    if (!Array.isArray(results) || results.length === 0) return undefined;
    
    // Group results by item code
    const groupedResults: Record<string, TestResult[]> = {};
    const weightedSums: Record<string, number> = {};
    const totalWeights: Record<string, number> = {};
    
    // Perform weighted average calculation
    results.forEach(result => {
      const { itemCode, value, weight = 1 } = result;
      
      if (!groupedResults[itemCode]) {
        groupedResults[itemCode] = [];
        weightedSums[itemCode] = 0;
        totalWeights[itemCode] = 0;
      }
      
      groupedResults[itemCode].push(result);
      weightedSums[itemCode] += parseFloat(value.toString()) * parseFloat(weight.toString());
      totalWeights[itemCode] += parseFloat(weight.toString());
    });
    
    // Calculate final weighted averages
    const weightedAverages: Record<string, number> = {};
    
    Object.keys(groupedResults).forEach(itemCode => {
      weightedAverages[itemCode] = weightedSums[itemCode] / totalWeights[itemCode];
    });
    
    // Update the record
    record.weightedResults = weightedAverages;
    this.testingRecords.set(testingRecordId, record);
    
    return weightedAverages;
  }

  // === 煤险处置相关存储方法 ===
  
  // 添加煤险处置相关的Map存储
  private coalProducts = new Map<number, CoalProduct>();
  private coalBids = new Map<number, CoalBid>();
  private coalOrders = new Map<number, CoalOrder>();
  private coalFavorites = new Map<number, CoalFavorite>();
  private collateralFinancingApplications = new Map<number, CollateralFinancingApplication>();
  
  // 添加计数器
  currentCoalProductId = 1;
  currentCoalBidId = 1;
  currentCoalOrderId = 1;
  currentCoalFavoriteId = 1;
  currentCollateralFinancingApplicationId = 1;
  
  // Coal Product methods (煤险处置 - 煤炭产品)
  async createCoalProduct(product: InsertCoalProduct): Promise<CoalProduct> {
    const id = this.currentCoalProductId++;
    const now = new Date();
    
    const coalProduct: CoalProduct = {
      id,
      productCode: product.productCode,
      titleCn: product.titleCn,
      titleEn: product.titleEn,
      descriptionCn: product.descriptionCn || null,
      descriptionEn: product.descriptionEn || null,
      coalType: product.coalType,
      quantity: product.quantity,
      originalPrice: product.originalPrice,
      currentPrice: product.currentPrice,
      location: product.location,
      quality: product.quality,
      imageUrl: product.imageUrl || null,
      status: product.status || 'available',
      disposalType: product.disposalType,
      auctionEndTime: product.auctionEndTime || null,
      minDiscountPrice: product.minDiscountPrice || null,
      collateralRatio: product.collateralRatio || null,
      riskLevel: product.riskLevel,
      createdAt: now,
      updatedAt: now
    };
    
    this.coalProducts.set(id, coalProduct);
    return coalProduct;
  }
  
  async getCoalProductById(id: number): Promise<CoalProduct | undefined> {
    return this.coalProducts.get(id);
  }
  
  async getCoalProductByCode(productCode: string): Promise<CoalProduct | undefined> {
    return Array.from(this.coalProducts.values()).find(
      (product) => product.productCode === productCode
    );
  }
  
  async getAllCoalProducts(): Promise<CoalProduct[]> {
    return Array.from(this.coalProducts.values());
  }
  
  async getCoalProductsByDisposalType(disposalType: string): Promise<CoalProduct[]> {
    return Array.from(this.coalProducts.values()).filter(
      (product) => product.disposalType === disposalType
    );
  }
  
  async getCoalProductsByStatus(status: string): Promise<CoalProduct[]> {
    return Array.from(this.coalProducts.values()).filter(
      (product) => product.status === status
    );
  }
  
  async getCoalProductsByRiskLevel(riskLevel: string): Promise<CoalProduct[]> {
    return Array.from(this.coalProducts.values()).filter(
      (product) => product.riskLevel === riskLevel
    );
  }
  
  async updateCoalProduct(id: number, product: Partial<InsertCoalProduct>): Promise<CoalProduct | undefined> {
    const existingProduct = await this.getCoalProductById(id);
    if (!existingProduct) {
      return undefined;
    }
    
    const updatedProduct: CoalProduct = {
      ...existingProduct,
      ...product,
      updatedAt: new Date()
    };
    
    this.coalProducts.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async updateCoalProductStatus(id: number, status: string): Promise<CoalProduct | undefined> {
    return this.updateCoalProduct(id, { status } as Partial<InsertCoalProduct>);
  }
  
  // Coal Bid methods (煤险处置 - 竞拍出价)
  async createCoalBid(bid: InsertCoalBid): Promise<CoalBid> {
    const id = this.currentCoalBidId++;
    const now = new Date();
    
    const coalBid: CoalBid = {
      id,
      productId: bid.productId,
      userId: bid.userId || null,
      bidderName: bid.bidderName,
      bidderContact: bid.bidderContact,
      bidAmount: bid.bidAmount,
      bidTime: now,
      status: bid.status || 'pending',
      notes: bid.notes || null
    };
    
    this.coalBids.set(id, coalBid);
    
    // Check if this is the highest bid and update product price if necessary
    const product = await this.getCoalProductById(bid.productId);
    if (product && product.disposalType === 'auction') {
      const highestBid = await this.getHighestBidForProduct(bid.productId);
      if (highestBid && highestBid.bidAmount > product.currentPrice) {
        await this.updateCoalProduct(bid.productId, { 
          currentPrice: highestBid.bidAmount 
        } as Partial<InsertCoalProduct>);
      }
    }
    
    return coalBid;
  }
  
  async getCoalBidById(id: number): Promise<CoalBid | undefined> {
    return this.coalBids.get(id);
  }
  
  async getCoalBidsByProductId(productId: number): Promise<CoalBid[]> {
    return Array.from(this.coalBids.values()).filter(
      (bid) => bid.productId === productId
    );
  }
  
  async getCoalBidsByUserId(userId: number): Promise<CoalBid[]> {
    return Array.from(this.coalBids.values()).filter(
      (bid) => bid.userId === userId
    );
  }
  
  async getHighestBidForProduct(productId: number): Promise<CoalBid | undefined> {
    const bids = await this.getCoalBidsByProductId(productId);
    if (bids.length === 0) {
      return undefined;
    }
    
    return bids.reduce((highest, current) => {
      return current.bidAmount > highest.bidAmount ? current : highest;
    });
  }
  
  async updateCoalBidStatus(id: number, status: string): Promise<CoalBid | undefined> {
    const bid = await this.getCoalBidById(id);
    if (!bid) {
      return undefined;
    }
    
    const updatedBid: CoalBid = {
      ...bid,
      status
    };
    
    this.coalBids.set(id, updatedBid);
    return updatedBid;
  }
  
  // Coal Order methods (煤险处置 - 煤炭订单)
  async createCoalOrder(order: InsertCoalOrder): Promise<CoalOrder> {
    const id = this.currentCoalOrderId++;
    const now = new Date();
    
    const coalOrder: CoalOrder = {
      id,
      orderNumber: order.orderNumber,
      productId: order.productId,
      userId: order.userId || null,
      buyerName: order.buyerName,
      buyerContact: order.buyerContact,
      buyerCompany: order.buyerCompany || null,
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus || 'pending',
      deliveryStatus: order.deliveryStatus || 'pending',
      transactionType: order.transactionType,
      bidId: order.bidId || null,
      applicationId: order.applicationId || null,
      deliveryAddress: order.deliveryAddress || null,
      deliveryContact: order.deliveryContact || null,
      deliveryPhone: order.deliveryPhone || null,
      notes: order.notes || null,
      createdAt: now,
      updatedAt: now
    };
    
    this.coalOrders.set(id, coalOrder);
    
    // Update product status to reserved
    await this.updateCoalProductStatus(order.productId, 'reserved');
    
    // If order was from an auction, update the corresponding bid status
    if (order.bidId) {
      await this.updateCoalBidStatus(order.bidId, 'accepted');
    }
    
    return coalOrder;
  }
  
  async getCoalOrderById(id: number): Promise<CoalOrder | undefined> {
    return this.coalOrders.get(id);
  }
  
  async getCoalOrderByOrderNumber(orderNumber: string): Promise<CoalOrder | undefined> {
    return Array.from(this.coalOrders.values()).find(
      (order) => order.orderNumber === orderNumber
    );
  }
  
  async getCoalOrdersByProductId(productId: number): Promise<CoalOrder[]> {
    return Array.from(this.coalOrders.values()).filter(
      (order) => order.productId === productId
    );
  }
  
  async getCoalOrdersByUserId(userId: number): Promise<CoalOrder[]> {
    return Array.from(this.coalOrders.values()).filter(
      (order) => order.userId === userId
    );
  }
  
  async getAllCoalOrders(): Promise<CoalOrder[]> {
    return Array.from(this.coalOrders.values());
  }
  
  async updateCoalOrderStatus(id: number, paymentStatus: string, deliveryStatus: string): Promise<CoalOrder | undefined> {
    const order = await this.getCoalOrderById(id);
    if (!order) {
      return undefined;
    }
    
    const updatedOrder: CoalOrder = {
      ...order,
      paymentStatus,
      deliveryStatus,
      updatedAt: new Date()
    };
    
    this.coalOrders.set(id, updatedOrder);
    
    // If both payment and delivery are completed, mark the product as sold
    if (paymentStatus === 'paid' && deliveryStatus === 'delivered') {
      await this.updateCoalProductStatus(order.productId, 'sold');
    }
    
    return updatedOrder;
  }
  
  // Coal Favorites methods (煤险处置 - 收藏夹)
  async createCoalFavorite(favorite: InsertCoalFavorite): Promise<CoalFavorite> {
    // Check if product is already favorited
    if (favorite.userId === null || favorite.userId === undefined) {
      throw new Error("User ID is required");
    }
    
    const isAlreadyFavorited = await this.isProductFavoritedByUser(favorite.productId, favorite.userId);
    if (isAlreadyFavorited) {
      throw new Error("Product already in favorites");
    }
    
    const id = this.currentCoalFavoriteId++;
    
    const coalFavorite: CoalFavorite = {
      id,
      userId: favorite.userId,
      productId: favorite.productId,
      createdAt: new Date()
    };
    
    this.coalFavorites.set(id, coalFavorite);
    return coalFavorite;
  }
  
  async getCoalFavoriteById(id: number): Promise<CoalFavorite | undefined> {
    return this.coalFavorites.get(id);
  }
  
  async getCoalFavoritesByUserId(userId: number): Promise<CoalFavorite[]> {
    return Array.from(this.coalFavorites.values()).filter(
      (favorite) => favorite.userId === userId
    );
  }
  
  async removeCoalFavorite(id: number): Promise<boolean> {
    const favorite = await this.getCoalFavoriteById(id);
    if (!favorite) {
      return false;
    }
    
    return this.coalFavorites.delete(id);
  }
  
  async isProductFavoritedByUser(productId: number, userId: number | null | undefined): Promise<boolean> {
    if (userId === null || userId === undefined) return false;
    const favorites = await this.getCoalFavoritesByUserId(userId);
    return favorites.some(fav => fav.productId === productId);
  }
  
  // Collateral Financing Application methods
  async createCollateralFinancingApplication(application: InsertCollateralFinancingApplication): Promise<CollateralFinancingApplication> {
    const id = this.currentCollateralFinancingApplicationId++;
    const now = new Date();
    
    const financingApplication: CollateralFinancingApplication = {
      id,
      name: application.name,
      company: application.company,
      position: application.position || null,
      email: application.email,
      phone: application.phone,
      
      coalType: application.coalType,
      quantity: application.quantity.toString(),
      calorificValue: application.calorificValue ? application.calorificValue.toString() : null,
      sulfurContent: application.sulfurContent ? application.sulfurContent.toString() : null,
      
      estimatedValue: application.estimatedValue.toString(),
      financingAmount: application.financingAmount.toString(),
      financingPeriod: application.financingPeriod,
      
      storageLocation: application.storageLocation || null,
      needStorage: application.needStorage || false,
      
      hasPreviousCollateral: application.hasPreviousCollateral || false,
      additionalInfo: application.additionalInfo || null,
      
      status: "pending",
      createdAt: now,
      updatedAt: now
    };
    
    this.collateralFinancingApplications.set(id, financingApplication);
    return financingApplication;
  }
  
  async getCollateralFinancingApplicationById(id: number): Promise<CollateralFinancingApplication | undefined> {
    return this.collateralFinancingApplications.get(id);
  }
  
  async getCollateralFinancingApplicationsByEmail(email: string): Promise<CollateralFinancingApplication[]> {
    return Array.from(this.collateralFinancingApplications.values()).filter(
      (application) => application.email === email
    );
  }
  
  async getAllCollateralFinancingApplications(): Promise<CollateralFinancingApplication[]> {
    return Array.from(this.collateralFinancingApplications.values());
  }
  
  async updateCollateralFinancingApplicationStatus(id: number, status: string): Promise<CollateralFinancingApplication | undefined> {
    const application = await this.getCollateralFinancingApplicationById(id);
    if (!application) {
      return undefined;
    }
    
    const updatedApplication: CollateralFinancingApplication = {
      ...application,
      status,
      updatedAt: new Date()
    };
    
    this.collateralFinancingApplications.set(id, updatedApplication);
    return updatedApplication;
  }

  // 初始化示例司机和车辆数据
  private async initializeTransportDriversAndVehicles() {
    // 示例司机数据
    const drivers = [
      {
        driverCode: "DRV001",
        nameEn: "Liu Wei",
        nameCn: "刘伟",
        phone: "13800138001",
        licenseNumber: "B123456789",
        licenseType: "A",
        experienceYears: "8",
        status: "available",
        currentLocation: JSON.stringify({ lat: 40.7128, lng: -74.006 }),
        rating: "4.8"
      },
      {
        driverCode: "DRV002",
        nameEn: "Wang Kun",
        nameCn: "王坤",
        phone: "13800138002",
        licenseNumber: "B223456789",
        licenseType: "A",
        experienceYears: "5",
        status: "available",
        currentLocation: JSON.stringify({ lat: 40.7128, lng: -74.006 }),
        rating: "4.6"
      },
      {
        driverCode: "DRV003",
        nameEn: "Zhang Min",
        nameCn: "张敏",
        phone: "13800138003",
        licenseNumber: "B323456789",
        licenseType: "B",
        experienceYears: "3",
        status: "available",
        currentLocation: JSON.stringify({ lat: 40.7128, lng: -74.006 }),
        rating: "4.5"
      }
    ];

    // 示例车辆数据
    const vehicles = [
      {
        vehicleCode: "VEH001",
        plateNumber: "京A12345",
        vehicleType: "heavy",
        capacityTons: "30",
        manufacturerEn: "Volvo",
        manufacturerCn: "沃尔沃",
        modelYear: "2020",
        status: "available",
        maintenanceStatus: "good",
        currentLocation: JSON.stringify({ lat: 40.7128, lng: -74.006 })
      },
      {
        vehicleCode: "VEH002",
        plateNumber: "京B12345",
        vehicleType: "medium",
        capacityTons: "20",
        manufacturerEn: "Mercedes",
        manufacturerCn: "奔驰",
        modelYear: "2021",
        status: "available",
        maintenanceStatus: "good",
        currentLocation: JSON.stringify({ lat: 40.7128, lng: -74.006 })
      },
      {
        vehicleCode: "VEH003",
        plateNumber: "京C12345",
        vehicleType: "light",
        capacityTons: "10",
        manufacturerEn: "Dongfeng",
        manufacturerCn: "东风",
        modelYear: "2022",
        status: "available",
        maintenanceStatus: "good",
        currentLocation: JSON.stringify({ lat: 40.7128, lng: -74.006 })
      }
    ];

    // 创建司机和车辆
    for (const driver of drivers) {
      await this.createTransportDriver(driver as InsertTransportDriver);
    }

    for (const vehicle of vehicles) {
      await this.createTransportVehicle(vehicle as InsertTransportVehicle);
    }
  }
  
  // Transport Order methods (煤炭运输 - 运输订单)
  async createTransportOrder(order: InsertTransportOrder): Promise<TransportOrder> {
    const id = this.currentTransportOrderId++;
    const now = new Date();
    
    // 生成订单号
    const orderNumber = `TO${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${id.toString().padStart(4, '0')}`;
    
    const transportOrder: TransportOrder = {
      id,
      orderNumber,
      userId: order.userId,
      pickupAddress: order.pickupAddress,
      deliveryAddress: order.deliveryAddress,
      pickupTime: order.pickupTime ? new Date(order.pickupTime) : null,
      deliveryTime: order.deliveryTime ? new Date(order.deliveryTime) : null,
      cargoTypeEn: order.cargoTypeEn,
      cargoTypeCn: order.cargoTypeCn,
      weightTons: order.weightTons,
      volume: order.volume ?? null,
      specialRequirements: order.specialRequirements ?? null,
      driverId: order.driverId ?? null,
      vehicleId: order.vehicleId ?? null,
      status: order.status || "pending",
      estimatedPrice: order.estimatedPrice,
      actualPrice: order.actualPrice ?? null,
      createdAt: now,
      updatedAt: now
    };
    
    this.transportOrders.set(id, transportOrder);
    return transportOrder;
  }
  
  async getTransportOrderById(id: number): Promise<TransportOrder | undefined> {
    return this.transportOrders.get(id);
  }
  
  async getTransportOrderByOrderNumber(orderNumber: string): Promise<TransportOrder | undefined> {
    return Array.from(this.transportOrders.values()).find(
      (order) => order.orderNumber === orderNumber
    );
  }
  
  async getTransportOrdersByUserId(userId: number): Promise<TransportOrder[]> {
    return Array.from(this.transportOrders.values()).filter(
      (order) => order.userId === userId
    );
  }
  
  async getAllTransportOrders(): Promise<TransportOrder[]> {
    return Array.from(this.transportOrders.values());
  }
  
  async getTransportOrdersByStatus(status: string): Promise<TransportOrder[]> {
    return Array.from(this.transportOrders.values()).filter(
      (order) => order.status === status
    );
  }
  
  async getTransportOrdersByDriverId(driverId: number): Promise<TransportOrder[]> {
    return Array.from(this.transportOrders.values()).filter(
      (order) => order.driverId === driverId
    );
  }
  
  async updateTransportOrderStatus(id: number, status: string): Promise<TransportOrder | undefined> {
    const existingOrder = await this.getTransportOrderById(id);
    if (!existingOrder) return undefined;
    
    const updatedOrder: TransportOrder = {
      ...existingOrder,
      status,
      updatedAt: new Date()
    };
    
    this.transportOrders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  async updateTransportOrder(id: number, order: Partial<InsertTransportOrder>): Promise<TransportOrder | undefined> {
    const existingOrder = await this.getTransportOrderById(id);
    if (!existingOrder) return undefined;
    
    const updatedOrder: TransportOrder = {
      ...existingOrder,
      pickupAddress: order.pickupAddress ?? existingOrder.pickupAddress,
      deliveryAddress: order.deliveryAddress ?? existingOrder.deliveryAddress,
      pickupTime: order.pickupTime ? new Date(order.pickupTime) : existingOrder.pickupTime,
      deliveryTime: order.deliveryTime ? new Date(order.deliveryTime) : existingOrder.deliveryTime,
      cargoTypeEn: order.cargoTypeEn ?? existingOrder.cargoTypeEn,
      cargoTypeCn: order.cargoTypeCn ?? existingOrder.cargoTypeCn,
      weightTons: order.weightTons ?? existingOrder.weightTons,
      volume: order.volume !== undefined ? order.volume : existingOrder.volume,
      specialRequirements: order.specialRequirements !== undefined ? order.specialRequirements : existingOrder.specialRequirements,
      estimatedPrice: order.estimatedPrice ?? existingOrder.estimatedPrice,
      actualPrice: order.actualPrice !== undefined ? order.actualPrice : existingOrder.actualPrice,
      updatedAt: new Date()
    };
    
    this.transportOrders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  async assignDriver(orderId: number, driverId: number, vehicleId: number): Promise<TransportOrder | undefined> {
    const existingOrder = await this.getTransportOrderById(orderId);
    if (!existingOrder) return undefined;
    
    const driver = await this.getTransportDriverById(driverId);
    if (!driver) throw new Error("Driver not found");
    
    const vehicle = await this.getTransportVehicleById(vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");
    
    // 更新司机状态为忙碌
    await this.updateTransportDriverStatus(driverId, "busy");
    
    // 更新车辆状态为使用中
    await this.updateTransportVehicleStatus(vehicleId, "in_use");
    
    const updatedOrder: TransportOrder = {
      ...existingOrder,
      driverId,
      vehicleId,
      status: "assigned",
      updatedAt: new Date()
    };
    
    this.transportOrders.set(orderId, updatedOrder);
    return updatedOrder;
  }
  
  // Transport Driver methods (煤炭运输 - 司机管理)
  async createTransportDriver(driver: InsertTransportDriver): Promise<TransportDriver> {
    // 检查司机代码是否已存在
    const existingDriver = await this.getTransportDriverByCode(driver.driverCode);
    if (existingDriver) {
      throw new Error(`Driver with code ${driver.driverCode} already exists`);
    }
    
    const id = this.currentTransportDriverId++;
    const now = new Date();
    
    const transportDriver: TransportDriver = {
      id,
      driverCode: driver.driverCode,
      nameEn: driver.nameEn,
      nameCn: driver.nameCn,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      licenseType: driver.licenseType,
      experienceYears: driver.experienceYears,
      status: driver.status || "available",
      currentLocation: driver.currentLocation,
      rating: driver.rating ?? null,
      createdAt: now,
      updatedAt: now
    };
    
    this.transportDrivers.set(id, transportDriver);
    return transportDriver;
  }
  
  async getTransportDriverById(id: number): Promise<TransportDriver | undefined> {
    return this.transportDrivers.get(id);
  }
  
  async getTransportDriverByCode(driverCode: string): Promise<TransportDriver | undefined> {
    return Array.from(this.transportDrivers.values()).find(
      (driver) => driver.driverCode === driverCode
    );
  }
  
  async getAllTransportDrivers(): Promise<TransportDriver[]> {
    return Array.from(this.transportDrivers.values());
  }
  
  async getAvailableTransportDrivers(): Promise<TransportDriver[]> {
    return Array.from(this.transportDrivers.values()).filter(
      (driver) => driver.status === "available"
    );
  }
  
  async updateTransportDriverStatus(id: number, status: string): Promise<TransportDriver | undefined> {
    const existingDriver = await this.getTransportDriverById(id);
    if (!existingDriver) return undefined;
    
    const updatedDriver: TransportDriver = {
      ...existingDriver,
      status,
      updatedAt: new Date()
    };
    
    this.transportDrivers.set(id, updatedDriver);
    return updatedDriver;
  }
  
  async updateTransportDriver(id: number, driver: Partial<InsertTransportDriver>): Promise<TransportDriver | undefined> {
    const existingDriver = await this.getTransportDriverById(id);
    if (!existingDriver) return undefined;
    
    const updatedDriver: TransportDriver = {
      ...existingDriver,
      nameEn: driver.nameEn ?? existingDriver.nameEn,
      nameCn: driver.nameCn ?? existingDriver.nameCn,
      phone: driver.phone ?? existingDriver.phone,
      licenseNumber: driver.licenseNumber ?? existingDriver.licenseNumber,
      licenseType: driver.licenseType ?? existingDriver.licenseType,
      experienceYears: driver.experienceYears ?? existingDriver.experienceYears,
      currentLocation: driver.currentLocation ?? existingDriver.currentLocation,
      rating: driver.rating !== undefined ? driver.rating : existingDriver.rating,
      updatedAt: new Date()
    };
    
    this.transportDrivers.set(id, updatedDriver);
    return updatedDriver;
  }
  
  // Transport Vehicle methods (煤炭运输 - 车辆管理)
  async createTransportVehicle(vehicle: InsertTransportVehicle): Promise<TransportVehicle> {
    // 检查车辆代码是否已存在
    const existingVehicle = await this.getTransportVehicleByCode(vehicle.vehicleCode);
    if (existingVehicle) {
      throw new Error(`Vehicle with code ${vehicle.vehicleCode} already exists`);
    }
    
    const id = this.currentTransportVehicleId++;
    const now = new Date();
    
    const transportVehicle: TransportVehicle = {
      id,
      vehicleCode: vehicle.vehicleCode,
      plateNumber: vehicle.plateNumber,
      vehicleType: vehicle.vehicleType,
      capacityTons: vehicle.capacityTons,
      manufacturerEn: vehicle.manufacturerEn,
      manufacturerCn: vehicle.manufacturerCn,
      modelYear: vehicle.modelYear,
      status: vehicle.status || "available",
      maintenanceStatus: vehicle.maintenanceStatus || "good",
      currentLocation: vehicle.currentLocation,
      createdAt: now,
      updatedAt: now
    };
    
    this.transportVehicles.set(id, transportVehicle);
    return transportVehicle;
  }
  
  async getTransportVehicleById(id: number): Promise<TransportVehicle | undefined> {
    return this.transportVehicles.get(id);
  }
  
  async getTransportVehicleByCode(vehicleCode: string): Promise<TransportVehicle | undefined> {
    return Array.from(this.transportVehicles.values()).find(
      (vehicle) => vehicle.vehicleCode === vehicleCode
    );
  }
  
  async getAllTransportVehicles(): Promise<TransportVehicle[]> {
    return Array.from(this.transportVehicles.values());
  }
  
  async getAvailableTransportVehicles(): Promise<TransportVehicle[]> {
    return Array.from(this.transportVehicles.values()).filter(
      (vehicle) => vehicle.status === "available"
    );
  }
  
  async updateTransportVehicleStatus(id: number, status: string): Promise<TransportVehicle | undefined> {
    const existingVehicle = await this.getTransportVehicleById(id);
    if (!existingVehicle) return undefined;
    
    const updatedVehicle: TransportVehicle = {
      ...existingVehicle,
      status,
      updatedAt: new Date()
    };
    
    this.transportVehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }
  
  async updateTransportVehicle(id: number, vehicle: Partial<InsertTransportVehicle>): Promise<TransportVehicle | undefined> {
    const existingVehicle = await this.getTransportVehicleById(id);
    if (!existingVehicle) return undefined;
    
    const updatedVehicle: TransportVehicle = {
      ...existingVehicle,
      plateNumber: vehicle.plateNumber ?? existingVehicle.plateNumber,
      vehicleType: vehicle.vehicleType ?? existingVehicle.vehicleType,
      capacityTons: vehicle.capacityTons ?? existingVehicle.capacityTons,
      manufacturerEn: vehicle.manufacturerEn ?? existingVehicle.manufacturerEn,
      manufacturerCn: vehicle.manufacturerCn ?? existingVehicle.manufacturerCn,
      modelYear: vehicle.modelYear ?? existingVehicle.modelYear,
      maintenanceStatus: vehicle.maintenanceStatus ?? existingVehicle.maintenanceStatus,
      currentLocation: vehicle.currentLocation ?? existingVehicle.currentLocation,
      updatedAt: new Date()
    };
    
    this.transportVehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }
  
  // Transport Tracking methods (煤炭运输 - 运输跟踪)
  async createTransportTracking(tracking: InsertTransportTracking): Promise<TransportTracking> {
    const id = this.currentTransportTrackingId++;
    const now = new Date();
    
    const transportTracking: TransportTracking = {
      id,
      orderId: tracking.orderId,
      statusEn: tracking.statusEn,
      statusCn: tracking.statusCn,
      locationName: tracking.locationName,
      coordinates: tracking.coordinates,
      timestamp: now,
      notes: tracking.notes ?? null,
      createdAt: now
    };
    
    this.transportTracking.set(id, transportTracking);
    return transportTracking;
  }
  
  async getTransportTrackingById(id: number): Promise<TransportTracking | undefined> {
    return this.transportTracking.get(id);
  }
  
  async getTransportTrackingsByOrderId(orderId: number): Promise<TransportTracking[]> {
    return Array.from(this.transportTracking.values())
      .filter(tracking => tracking.orderId === orderId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // 按时间倒序排列
  }
  
  async getLatestTransportTrackingByOrderId(orderId: number): Promise<TransportTracking | undefined> {
    const trackings = await this.getTransportTrackingsByOrderId(orderId);
    return trackings.length > 0 ? trackings[0] : undefined;
  }
}

export const storage = new MemStorage();
