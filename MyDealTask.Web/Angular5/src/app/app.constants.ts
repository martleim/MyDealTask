import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost:20525/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}