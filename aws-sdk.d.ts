interface ServiceOptions {
  apiVersion?: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
  credentials?: any;
  credentialProvider?: any;
  region?: string;
  maxRetries?: number;
  maxRedirects?: number;
  sslEnabled?: boolean;
  paramValidation?: any;
  convertResponseTypes?: boolean;
  correctClockSkew?: boolean;
  signatureVersion?: string;
  httpOptions?: {
    proxy?: string;
    agent?: any;
    timeout?: number;
  };
}

declare namespace Lambda {
  interface Options extends ServiceOptions {
    params?: {};
    region?: string;
  }

  interface InvokeParams {
    FunctionName: string;
    InvocationType?: 'Event' | 'RequestResponse' | 'DryRun';
    LogType?: 'None' | 'Tail';
    ClientContext?: string;
    Payload: string | Buffer;
    Qualifier?: string;
  }

  interface InvokeResponse {
    StatusCode: number;
    FunctionError?: 'Handled' | 'Unhandled';
    LogResult: string;
    Payload?: Buffer | string;
  }

  interface KinesisRecord {
    partitionKey: string;
    kinesisSchemaVersion: string;
    data: string;
    sequenceNumber: string;
  }

  interface KinesisEventRecord {
    kinesis: KinesisRecord;
    eventSource: 'aws:kinesis';
    eventID: string;
    invokeIdentityArn: string;
    eventVersion: string;
    eventName: 'aws:kinesis:record';
    eventSourceARN: string;
    awsRegion: string;
  }

  interface KinesisEvent {
    Records: KinesisEventRecord[];
  }

  interface SnsRecord {
    Message: string;
  }

  interface SnsEventRecord {
    Sns: SnsRecord;
  }

  interface SnsEvent {
    Records: SnsEventRecord[];
  }
}

declare namespace Kinesis {
  interface Options extends ServiceOptions {
    params?: any;
  }

  interface PutRecordParams {
    Data: Buffer|string;
    PartitionKey?: string;
    StreamName?: string;
  }

  interface PutRecordResponse {
    ShardId: string;
    SequenceNumber: string;
  }

  interface PutRecordsRecord {
    Data: Buffer|string;
    ExplicitHashKey?: string;
    PartitionKey: string;
  }

  interface PutRecordsParams {
    Records: PutRecordsRecord[];
    StreamName?: string;
  }

  interface PutRecordsResponseRecord {
    SequenceNumber: string;
    ShardId: string;
    ErrorCode?: string;
    ErrorMessage?: string;
  }

  interface PutRecordsResponse {
    FailedRecordCount: number;
    Records: PutRecordsResponseRecord[];
  }

  interface CreateStreamParams {
    StreamName?: string;
    ShardCount: number;
  }

  interface CreateStreamResponse {

  }

  interface DescribeStreamParams {
    StreamName?: string;
    Limit?: number;
    ExclusiveStartShardId?: string;
  }

  interface Shard {
    ShardId: string;
    ParentShardId?: string;
    AdjacentParentShardId?: string;
    HashKeyRange: {
      StartingHashKey: string;
      EndingHashKey: string;
    };
    SequenceNumberRange: {
      StartingSequenceNumber: string;
      EndingSequenceNumber?: string;
    };
  }

  type ShardLevelMetrics = 'ALL'|'IncomingBytes'|'IncomingRecords'|
    'OutgoingBytes'|'OutgoingRecords'|'WriteProvisionedThroughputExceeded'|
    'ReadProvisionedThroughputExceeded'|'IteratorAgeMilliseconds';

  interface EnhancedMonitoring {
    ShardLevelMetrics: ShardLevelMetrics[];
  }

  interface DescribeStreamResponse {
    StreamDescription: {
      StreamName: string;
      StreamARN: string;
      StreamStatus: 'CREATING'|'DELETING'|'ACTIVE'|'UPDATING';
      Shards: Shard[];
      HasMoreShards: boolean;
      RetentionPeriodHours: number;
      EnhancedMonitoring: EnhancedMonitoring[];
    };
  }

  interface GetRecordsParams {
    ShardIterator?: string;
    Limit?: number;
  }

  export interface Record {
    SequenceNumber: string;
    ApproximateArrivalTimestamp?: Date;
    Data: Buffer;
    PartitionKey: string;
  }

  interface GetRecordsResponse {
    Records: Record[];
    NextShardIterator: string|null;
    MillisBehindLatest: number;
  }

  type ShardIteratorType = 'AT_SEQUENCE_NUMBER' |
    'AFTER_SEQUENCE_NUMBER' |
    'AT_TIMESTAMP' |
    'TRIM_HORIZON' |
    'LATEST';

  interface GetShardIteratorParams {
    StreamName?: string;
    ShardId?: string;
    ShardIteratorType?: ShardIteratorType;
    StartingSequenceNumber?: string;
    Timestamp?: string|number;
  }

  interface GetShardIteratorResponse {
    ShardIterator: string;
  }
}

declare namespace S3 {
  interface Options extends ServiceOptions {
    params?: {
      Bucket?: string;
    };
  }

  interface Params {
    SSECustomerAlgorithm?: string;
    SSECustomerKey?: Buffer | string;
    SSECustomerKeyMD5?: string;
    RequestPayer?: 'requester';
  }

  interface Response {
    SSECustomerAlgorithm?: string;
    SSECustomerKeyMD5?: string;
    SSEKMSKeyId?: string;
    RequestCharged?: string;
  }

  interface PutObjectParams extends Params {
    Bucket?: string;
    Key?: string;
    ACL?: 'private' | 'public-read' | 'public-read-write' | 'authenticated-read' | 'aws-exec-read' | 'bucket-owner-read' | 'bucker-owner-full-control';
    Body: Buffer | string | {read: any, length: number};
    CacheControl?: string;
    ContentDisposition?: string;
    ContentEncoding?: string;
    ContentLanguage?: string;
    ContentLength?: number;
    ContentMD5?: string;
    ContentType?: string;
    Expires?: Date | string | number;
    GrantFullControl?: string;
    GrantRead?: string;
    GrantReadACP?: string;
    GrantWriteACP?: string;
    Metadata?: {[index: string]: string};
    ServerSideEncryption?: 'AES256' | 'aws:kms';
    StorageClass?: 'STANDARD' | 'REDUCED_REDUNDANCY' | 'STANDARD_IA';
    WebsiteRedirectLocation?: string;
  }

  interface PutObjectResponse extends Response {
    Expiration: string;
    ETag: string;
    ServerSideEncryption?: 'AES256' | 'aws:kms';
    VersionId?: string;
  }

  interface GetObjectParams extends Params {
    Bucket?: string;
    Key?: string;
    IfMatch?: string;
    IfModifiedSince?: Date | string | number;
    IfNoneMatch?: string;
    IfUnmodifiedSince?: Date | string | number;
    Range?: string;
    ResponseCacheControl?: string;
    ResponseContentDisposition?: string;
    ResponseContentEncoding?: string;
    ResponseContentLanguage?: string;
    ResponseContentType?: string;
    ResponseExpires?: Date | string | number;
    VersionId?: string;
  }

  interface GetObjectResponse extends Response {
    Body: Buffer | string;
    DeleteMarker?: boolean;
    AcceptRanges?: string;
    Expiration?: string;
    Restore?: string;
    LastModified?: Date;
    ContentLength: number;
    ETag: string;
    MissingMeta?: number;
    VersionId?: string;
    CacheControl?: string;
    ContentDisposition?: string;
    ContentEncoding?: string;
    ContentLanguage?: string;
    ContentRange?: string;
    ContentType?: string;
    Expires?: Date;
    WebsiteRedirectLocation?: string;
    ServerSideEncryption?: string;
    Metadata?: {};
    StorageClass?: 'STANDARD' | 'REDUCED_REDUNDANCY' | 'STANDARD_IA';
    RequestCharged?: string;
    ReplicationStatus?: 'COMPLETE' | 'PENDING' | 'FAILED' | 'REPLICA';
  }
}

declare namespace Route53 {
  interface Options extends ServiceOptions {

  }

  interface ChangeResourceRecordSetsParams {

  }

  interface ChangeResourceRecordSetsResponse {

  }

  interface ListHostedZonesByNameParams {
    DNSName?: string;
    HostedZoneId?: string;
    MaxItems?: string;
  }

  interface ListHostedZonesByNameResponse {
    HostedZones: {
      Id: string;
      Name: string;
      CallerReference: string;
      Config?: {
        Comment?: string;
        PrivateZone?: boolean;
      },
      ResourceRecordSetCount?: number;
    }[];
    DNSName?: string;
    HostedZoneId?: string;
    IsTruncated?: boolean;
    NextDNSName?: string;
    NextHostedZoneId?: string;
    MaxItems?: string;
  }
}

declare namespace AutoScaling {
  interface Options extends ServiceOptions {

  }

  interface DescribeAutoScalingGroupsParams {
    AutoScalingGroupNames: string[];
    MaxRecords?: number;
    NextToken?: string;
  }

  interface DescribeAutoScalingGroupsResponse {
    AutoScalingGroups: {
      AutoScalingGroupName: string;
      AutoScalingGroupARN: string;
      LaunchConfigurationName: string;
      Instances: {
        InstanceId: string;
      }[]
    }[];

  }
}

declare namespace EC2 {
  interface Options extends ServiceOptions {

  }

  interface Params {
    DryRun?: boolean;
  }

  interface Filter {
    Name: string;
    Values: string[];
  }

  interface CreateTagsParams extends Params {
    Resources: string[];
    Tags: {
      Key: string;
      Value: string;
    }[];
  }

  interface CreateTagsResponse {

  }

  interface DescribeInstancesParams extends Params {
    InstanceIds: string[];
    Filters?: Filter[];
  }

  interface SecurityGroup {
    GroupName: string;
    GroupId: string;
  }

  interface Association {
    PublicIp: string;
    PublicDnsName: string;
    IpOwnerId: string;
  }

  interface Reservation {
    ReservationId: string;
    OwnerId: string;
    RequesterId: string;

    Instances: {
      InstanceId: string;
      ImageId: string;
      State: {
        Code: number;
        Name: string;
      },
      PrivateDnsName: string;
      PublicDnsName: string;
      StateTransitionReason: string;
      KeyName: string;
      AmiLaunchIndex: number;
      ProductCodes: {
        ProductCodeId: string;
        ProductCodeType: string;
      }[];
      InstanceType: string;
      LaunchTime: Date;
      Placement: {
        AvailabilityZone: string;
        GroupName: string;
        Tenancy: string;
        HostId: string;
        Affinity: string;
      };
      KernelId: string;
      RamdiskId: string;
      Platform: string;
      Monitoring: {
        State: string;
      }
      SubnetId: string;
      VpcId: string;
      PrivateIpAddress: string;
      PublicIpAddress: string;
      StateReason: {
        Code: string;
        Message: string;
      };
      Architecture: string;
      RootDeviceType: string;
      RootDeviceName: string;
      BlockDeviceMappings: {
        DeviceName: string;
        Ebs: {
          VolumeId: string;
          Status: string;
          AttachTime: Date;
          DeleteOnTermination: boolean;
        }
      }[];
      VirtualizationType: string;
      InstanceLifecycle: string;
      SpotInstanceRequestId?: string;
      ClientToken: string;
      Tags: {
        Key: string;
        Value: string;
      }[];
      SecurityGroups: SecurityGroup[];
      SourceDestCheck: boolean;
      Hypervisor: string;

      NetworkInterfaces: {
        NetworkInterfaceId: string;
        SubnetId: string;
        VpcId: string;
        Description: string;
        OwnerId: string;
        Status: string;
        MacAddress: string;
        PrivateIpAddress: string;
        PrivateDnsName: string;
        SourceDestCheck: boolean;
        Groups: SecurityGroup[];

        Attachment: {
          AttachmentId: string;
          DeviceIndex: number;
          Status: string;
          AttachTime: Date;
          DeleteOnTermination: boolean;
        };

        Association: Association;

        PrivateIpAddresses: {
          PrivateIpAddress: string;
          PrivateDnsName: string;
          Primary: boolean;
          Association: Association;
        }[]
      }[]

      IamInstanceProfile: {
        Arn: string;
        Id: string;
      }

      EbsOptimized: boolean;
      SriovNetSupport: string;
      EnaSupport: boolean;
    }[];
  }

  interface DescribeInstancesResponse {
    Reservations: Reservation[];
    NextToken?: string | null;
  }

  interface DescribeInstanceStatusParams extends Params {
    InstanceIds: string[];
    Filters?: Filter[];
    NextToken?: string;
    MaxResults?: number;
    IncludeAllInstances?: boolean;
  }

  interface DescribeInstanceStatusResponse {
    InstanceStatuses: InstanceStatus[];
    NextToken?: string | null;
  }

  interface WaitForParams extends Params {
    InstanceIds: string[];
    Filters?: Filter[];
    NextToken?: string;
    MaxResults?: number;
  }

  interface Event {
    Code: string;
    Description: string;
    NotBefore: Date;
    NotAfter: Date;
  }

  interface InstanceState {
    Code: number;
    Name: string;
  }

  interface StatusDetails {
    Name: string;
    Status: string;
    ImpairedSince: Date;
  }

  interface InstanceStatus {
    InstanceId: string;
    AvailabilityZone: string;
    Events: Event[];
    InstanceState: InstanceState;
    SystemStatus: {
      Status: string;
      Details: StatusDetails[];
    };
    InstanceStatus: {
      Status: string;
      Details: StatusDetails[];
    };
  }

  interface WaitForResponse {
    Reservations?: Reservation[];
    InstanceStatuses?: InstanceStatus[];
    NextToken?: string | null;
  }
}

declare namespace ECS {
  interface Options extends ServiceOptions {

  }

  interface DescribeContainerInstancesParams {
    cluster: string;
    containerInstances: string[];
  }

  interface ContainerInstance {
    containerInstanceArn: string;
    ec2InstanceId: string;
    versionInfo: {
      agentVersion: string;
      agentHash: string;
      dockerVersion: string;
    };
    remainingResources: {
      name: string;
      type: string;
      doubleValue?: number;
      longValue?: number;
      integerValue?: number;
      stringSetValue?: string[];
    }[];
    registeredResources: {
      name: string;
      type: string;
      doubleValue?: number;
      longValue?: number;
      integerValue?: number;
      stringSetValue?: string[];
    }[];
    status: string;
    agentConnected: boolean;
    runningTasksCount: number;
    pendingTasksCount: number;
    agentUpdateStatus: string;
    attributes: {
      name: string;
      value: string;
    }[];
  }

  interface DescribeContainerInstancesResponse {
    containerInstances: ContainerInstance[];
    failures: {
      arn: string;
      reason: string;
    }[];
  }

  interface DescribeTaskDefinitionParams {
    taskDefinition: string;
  }

  interface RequiresAttribute {
    name: string;
    value?: string;
  }

  interface Volume {
    name: string;
    host?: { sourcePath: string; };
  }

  interface TaskDefinition {
    taskDefinitionArn: string;
    containerDefinitions: ContainerDefinition[];
    family: string;
    taskRoleArn?: string;
    networkMode?: 'bridge' | 'host' | 'none';
    revision?: number;
    volumes?: Volume[];
    status?: 'ACTIVE' | 'INACTIVE';
    requiresAttributes?: RequiresAttribute[];
  }

  interface ContainerDefinition {
    name: string;
    image: string;
    cpu?: number;
    memory?: number;
    memoryReservation?: number;
    links?: string[];
    portMappings?: {
      containerPort: number;
      hostPort: number;
      protocol?: 'tcp' | 'udp'
    }[];
    essential: boolean;
    entryPoint?: string[];
    command?: string[];
    environment?: {
      name: string;
      value: string;
    }[];
    mountPoints?: {
      sourceVolume: string;
      containerPath: string;
      readOnly: boolean;
    }[];
    volumesFrom?: {
      sourceContainer: string;
      readOnly: boolean;
    }[];
    hostname?: string;
    user?: string;
    workingDirectory?: string;
    disableNetworking?: boolean;
    privileged?: boolean;
    readonlyRootFilesystem?: boolean;
    dnsServers?: string[];
    dnsSearchDomains?: string[];
    extraHosts?: {
      hostname: string;
      ipAddress: string;
    }[];
    dockerSecurityOptions?: string[];
    dockerLabels?: {[index: string]: string};
    ulimits?: {
      name: 'core' | 'cpu' | 'data' | 'fsize' | 'locks' | 'memlock' | 'msgqueue' |
        'nice' | 'nofile' | 'nproc' | 'rss' | 'rtprio' | 'rttime' | 'sigpending' |
        'stack';
      softLimit: number;
      hardLimit: number;
    }[];
    logConfiguration?: {
      logDriver: 'json-file' | 'syslog' | 'journald' | 'gelf' | 'fluentd' |
        'awslogs' | 'splunk';
      options?: {[index: string]: string};
    };
  }

  interface DescribeTaskDefinitionResponse {
    taskDefinition: TaskDefinition;
  }

  interface ListContainerInstancesParams {
    cluster: string;
    nextToken?: string;
    maxResults?: number;
  }

  interface ListContainerInstancesResponse {
    containerInstanceArns: string[];
    nextToken?: string | null;
  }

  interface RegisterTaskDefinitionParams {
    family: string;
    taskRoleArn?: string;
    networkMode?: 'bridge' | 'host' | 'none';
    containerDefinitions: ContainerDefinition[];
    volumes?: {
      name: string;
      host?: { sourcePath: string; }
    }[];
  }

  interface RegisterTaskDefinitionResponse {
    taskDefinition: {
      taskDefinitionArn: string;
      containerDefinitions: ContainerDefinition[];
      family: string;
      taskRoleArn?: string;
      revision: number;
      volumes: Volume[];
      status: 'ACTIVE' | 'INACTIVE';
      requiresAttributes: RequiresAttribute[];
    };
  }

  interface DeregisterTaskDefinitionParams {
    taskDefinition:string;
  }

  interface DeregisterTaskDefinitionResponse {
    taskDefinition: TaskDefinition;
  }

  interface ContainerOverrides {
    name: string;
    command?: string;
    environment?: {
      name: string;
      value: string;
    }[];
  }

  interface StartTaskParams {
    cluster: string;
    taskDefinition: string;
    overrides: {
      containerOverrides: ContainerOverrides[]
      taskRoleArn?: string;
    };
    containerInstances?: string[];
    startedBy?: string;
  }

  interface StartTaskResponse {
    tasks: {
      taskArn: string;
      clusterArn: string;
      taskDefinitionArn: string;
      containerInstanceArn: string;
      overrides: {
        containerOverrides: ContainerOverrides[]
        taskRoleArn?: string;
      };
      lastStatus: string;
      desiredStatus: string;
      containers: {
        containerArn: string;
        taskArn: string;
        name: string;
        lastStatus: string;
        exitCode: number;
        reason: string;
        networkBindings: {
          bindIP: string;
          containerPort: number;
          hostPort: number;
          protocol?: 'tcp' | 'udp'
        }[]
      }[]
      startedBy: string;
      stoppedReason: string;
      createdAt: Date;
      startedAt: Date;
      stoppedAt: Date;
    }[];
    failures: {
      arn: string;
      reason: string;
    }[];
  }

  interface ListTasksParams {
    cluster?: string;
    containerInstance?: string;
    family?: string;
    nextToken?: string;
    maxResults?: number;
    startedBy?: string;
    serviceName?: string;
    desiredStatus?: 'RUNNING' | 'PENDING' | 'STOPPED';
  }

  interface ListTasksResponse {
    taskArns: string[];
    nextToken?: string | null;
  }

  interface ListTaskDefinitionsParams {
    familyPrefix?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    sort?: 'ASC' | 'DESC';
    nextToken?: string;
    maxResults?: number;
  }

  interface ListTaskDefinitionsResponse {
    taskDefinitionArns: string[];
    nextToken?: string | null;
  }

  interface ListTaskDefinitionFamiliesParams {
    familyPrefix?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'ALL';
    nextToken?: string;
    maxResults?: number;
  }

  interface ListTaskDefinitionFamiliesResponse {
    families: string[];
    nextToken?: string | null;
  }

  interface UpdateServiceParams {
    cluster: string;
    service: string;
    desiredCount?: number;
    taskDefinition?: string;
    deploymentConfiguration?: {
      maximumPercent?: number;
      minimumHealthyPercent?: number;
    };
  }

  interface Event {
    id: string;
    createdAt: Date;
    message: string;
  }

  interface UpdateServiceResponse {
    service: {
      serviceArn: string;
      serviceName: string;
      clusterArn: string;
      loadBalancers?: {
        targetGroupArn: string;
        loadBalancerName: string;
        containerName: string;
        containerPort: number;
      }[];
      status: 'ACTIVE' | 'DRAINING' | 'INACTIVE';
      desiredCount: number;
      runningCount: number;
      pendingCount: number;
      taskDefinition: string;
      deploymentConfiguration: {
        maximumPercent: number;
        minimumHealthyPercent: number
      };
      deployments: {
        id: string;
        status: string;
        taskDefinition: string;
        desiredCount: number;
        pendingCount: number;
        runningCount: number;
        createdAt: Date;
        updatedAt: Date;
      }[];
      roleArn: string;
      events: Event[];
    };
  }
}


declare module 'aws-sdk' {
  type Callback<T> = (err: any, data: T) => void;

  interface Response<T> {
    promise(): Promise<T>;
  }

  export class Lambda {
    constructor(options?: Lambda.Options);

    invoke(params: Lambda.InvokeParams, callback?: Callback<Lambda.InvokeResponse>): Response<Lambda.InvokeResponse>;
  }

  export class Kinesis {
    constructor(options?: Kinesis.Options);

    putRecord(params: Kinesis.PutRecordParams,
              callback?: Callback<Kinesis.PutRecordResponse>): Response<Kinesis.PutRecordResponse>;

    putRecords(params: Kinesis.PutRecordsParams,
               callback?: Callback<Kinesis.PutRecordsResponse>): Response<Kinesis.PutRecordsResponse>;

    createStream(params: Kinesis.CreateStreamParams,
                 callback?: Callback<Kinesis.CreateStreamResponse>): Response<Kinesis.CreateStreamResponse>;

    describeStream(params: Kinesis.DescribeStreamParams,
                   callback?: Callback<Kinesis.DescribeStreamResponse>): Response<Kinesis.DescribeStreamResponse>;

    getRecords(params: Kinesis.GetRecordsParams,
               callback?: Callback<Kinesis.GetRecordsResponse>): Response<Kinesis.GetRecordsResponse>

    getShardIterator(params: Kinesis.GetShardIteratorParams,
                     callback?: Callback<Kinesis.GetShardIteratorResponse>): Response<Kinesis.GetShardIteratorResponse>
  }

  export class S3 {
    constructor(options?: S3.Options);

    putObject(params: S3.PutObjectParams, callback?: Callback<S3.PutObjectResponse>): Response<S3.PutObjectResponse>;

    getObject(params: S3.GetObjectParams, callback?: Callback<S3.GetObjectResponse>): Response<S3.GetObjectResponse>;
  }

  export class Route53 {
    constructor(options?: Route53.Options);

    changeResourceRecordSets(params: Route53.ChangeResourceRecordSetsParams, callback?: Callback<Route53.ChangeResourceRecordSetsParams>): Response<Route53.ChangeResourceRecordSetsResponse>;

    listHostedZonesByName(params: Route53.ListHostedZonesByNameParams, callback?: Callback<Route53.ListHostedZonesByNameResponse>): Response<Route53.ListHostedZonesByNameResponse>;
  }

  export class AutoScaling {
    constructor(options?: AutoScaling.Options);

    describeAutoScalingGroups(params: AutoScaling.DescribeAutoScalingGroupsParams,
                              callback?: Callback<AutoScaling.DescribeAutoScalingGroupsResponse>): Response<AutoScaling.DescribeAutoScalingGroupsResponse>;
  }

  export class EC2 {
    constructor(options?: EC2.Options);

    createTags(params: EC2.CreateTagsParams, callback?: Callback<EC2.CreateTagsResponse>): Response<EC2.CreateTagsResponse>;

    describeInstances(params: EC2.DescribeInstancesParams, callback?: Callback<EC2.DescribeInstancesResponse>): Response<EC2.DescribeInstancesResponse>

    describeInstanceStatus(params: EC2.DescribeInstanceStatusParams, callback?: Callback<EC2.DescribeInstanceStatusResponse>): Response<EC2.DescribeInstanceStatusResponse>;

    waitFor(status: 'systemStatusOk', params: EC2.WaitForParams, callback?: Callback<EC2.WaitForResponse>): Response<EC2.WaitForResponse>;
  }

  export class ECS {
    constructor(options?: ECS.Options);

    describeContainerInstances(params: ECS.DescribeContainerInstancesParams, callback?: Callback<ECS.DescribeContainerInstancesResponse>): Response<ECS.DescribeContainerInstancesResponse>;

    describeTaskDefinition(params: ECS.DescribeTaskDefinitionParams, callback?: Callback<ECS.DescribeTaskDefinitionResponse>): Response<ECS.DescribeTaskDefinitionResponse>;

    listContainerInstances(params: ECS.ListContainerInstancesParams, callback?: Callback<ECS.ListContainerInstancesResponse>): Response<ECS.ListContainerInstancesResponse>;

    registerTaskDefinition(params: ECS.RegisterTaskDefinitionParams, callback?: Callback<ECS.RegisterTaskDefinitionResponse>): Response<ECS.RegisterTaskDefinitionResponse>;

    deregisterTaskDefinition(params: ECS.DeregisterTaskDefinitionParams, callback?: Callback<ECS.DeregisterTaskDefinitionResponse>): Response<ECS.DeregisterTaskDefinitionResponse>;

    startTask(params: ECS.StartTaskParams, callback?: Callback<ECS.StartTaskResponse>): Response<ECS.StartTaskResponse>;

    listTasks(params: ECS.ListTasksParams, callback?: Callback<ECS.ListTasksResponse>): Response<ECS.ListTasksResponse>;

    listTaskDefinitions(params: ECS.ListTaskDefinitionsParams, callback?: Callback<ECS.ListTaskDefinitionsResponse>): Response<ECS.
      ListTaskDefinitionsResponse>;

    listTaskDefinitionFamilies(params: ECS.ListTaskDefinitionFamiliesParams, callback?: Callback<ECS.ListTaskDefinitionFamiliesResponse>): Response<ECS.ListTaskDefinitionFamiliesResponse>;

    updateService(params: ECS.UpdateServiceParams, callback?: Callback<ECS.UpdateServiceResponse>): Response<ECS.UpdateServiceResponse>;
  }
}

