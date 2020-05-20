import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ReceivePage } from './receive.page'
import { TranslateModule } from '@ngx-translate/core'
import { PipesModule } from 'src/app/pipes/pipes.module'
import { QrAddressComponent } from './qr-address/qr-address.component'
import { QRAddressModule } from './qr-address/qr-address.module'
import { FormatPipe } from 'src/app/pipes/format/format'

const routes: Routes = [
  {
    path: '',
    component: ReceivePage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRAddressModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    PipesModule,
  ],
  providers: [
    FormatPipe,
  ],
  declarations: [ReceivePage],
})
export class ReceivePageModule {}