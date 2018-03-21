import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  countries: Array<any>;

  constructor(private appService: AppService) {
    this.doAsyncJobs().then(() => {
      this.sleep(30000);
      console.log('Finish!');
    });
    console.log('Not async');
  }

  async doAsyncJobs() {
    await this.getCountries();
    await this.getCountries2();
    console.log('Countries are loaded 2 times.');
  }

  getCountries(): Promise<any> {
    return this.appService.getCountries().toPromise().then((data) => {
      this.countries = data;
      this.countries.forEach(c => {
        c.value = c.code;
        c.label = c.name;
      });
      console.log('Countries are loading ...');
      // this.delay(30000).then();
      this.sleep(3000000000);
    });
  }

  getCountries2(): Promise<any> {
    return this.appService.getCountries().toPromise().then((data) => {
      this.countries = data;
      this.countries.forEach(c => {
        c.value = c.code;
        c.label = c.name;
      });
      console.log('Countries are loaded second time');
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms)).then();
  }

  sleep(teller) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > teller) {
        break;
      }
    }
  }
}
