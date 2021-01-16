import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [],
  imports: [AngularMaterialModule],
  exports: [],
  providers: [],
})
export class IconModule {
  private path: string = '../../../assets/images';
  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry
      .addSvgIcon('undo', this.setIconPath(`${this.path}/undo.svg`))
      .addSvgIcon('redo', this.setIconPath(`${this.path}/redo.svg`));
  }

  private setIconPath(icon: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(icon);
  }
}
