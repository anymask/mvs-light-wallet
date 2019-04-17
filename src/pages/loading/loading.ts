import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MvsServiceProvider } from '../../providers/mvs-service/mvs-service';

@IonicPage()
@Component({
    selector: 'page-loading',
    templateUrl: 'loading.html'
})
export class LoadingPage {

    loadingHeight: number = 0
    maxHeight: number
    progress: number = 1
    firstTxHeight: number

    showRestartOption = false

    constructor(public nav: NavController,
        private mvs: MvsServiceProvider,
        public translate: TranslateService,
        public platform: Platform,
        private event: Events) {

        this.event.subscribe("last_tx_height_update", (height) => {
            this.loadingHeight = height
            if (this.firstTxHeight === undefined) {
                this.firstTxHeight = height
            }
            this.progress = this.calculateProgress()
        });

    }

    ionViewDidEnter() {
        setTimeout(()=>this.updateBalances(), 1000)
    }

    private getHeight() {
        return this.mvs.updateHeight()
            .then((height: number) => {
                this.maxHeight = height;
            })
    }

    private updateBalances = () => {
        this.showRestartOption = false
        return this.getHeight()
            .then(() => this.mvs.getData())
            .then(() => this.mvs.setUpdateTime())
            .then(() => {
                this.progress = 100
                setTimeout(() => this.nav.setRoot("AccountPage"), 2000)
            })
            .catch((error) => {
                this.showRestartOption = true
                console.error(error)
            })
    }

    calculateProgress() {
        return Math.max(1, Math.min(99, Math.round((this.loadingHeight - this.firstTxHeight) / (this.maxHeight - this.firstTxHeight) * 100)))
    }

    cancel() {
        this.mvs.dataReset()
            .then(() => this.nav.setRoot("LoginPage"))
    }

}
