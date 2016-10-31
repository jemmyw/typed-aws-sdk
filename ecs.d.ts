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

  interface RegisterTaskDefinitionResponse {
    taskDefinitionArn: string;
    containerDefinitions: ContainerDefinition[];
    family: string;
    taskRoleArn?: string;
    networkMode: 'bridge' | 'host' | 'none';
    revision: number;
    volumes: Volume[];
    status: 'ACTIVE' | 'INACTIVE';
    requiresAttributes: RequiresAttribute[];
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

