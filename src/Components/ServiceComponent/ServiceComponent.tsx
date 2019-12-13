import React, { Component, ReactElement } from "react";

import ApiService from "../../Services/ApiService";
import IApiService from "../../Services/IApiService";

export interface ServiceProps {
  webService?: IApiService;
  location?: Location;
}

export default class ServiceComponent<
  ServiceComponentProps = any,
  ServiceComponentState = any
> extends Component<ServiceProps & ServiceComponentProps, ServiceComponentState> {
  public WebService: IApiService;
  public Location: Location;

  constructor(
    props: ServiceProps & ServiceComponentProps = {} as ServiceProps & ServiceComponentProps
  ) {
    super(props);
    this.WebService = props.webService ? props.webService : new ApiService();
    this.Location = props.location ? props.location : window.location;
  }
}
