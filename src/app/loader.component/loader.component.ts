import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OnInit, ElementRef, ViewChild, Component, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { GCHTTPService } from '../services/GC-Http.service';

@Component({
    selector: 'app-gc-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent {



    @ViewChild('content') content: ElementRef;
    oNgbModalRef: NgbModalRef;
    counter = 0;


    constructor(
        private modalService: NgbModal,
        private oGCHTTPService: GCHTTPService
    ) {
        this.oGCHTTPService.isWorking
            .subscribe((isWorking: boolean) => {
                if (isWorking) {
                    this.Start();
                } else {
                    this.Stop();
                }
            });
    }


    Start(): void {
        this.counter = this.counter + 1;
        if (this.counter === 1) {
            const oNgbModalOptions: NgbModalOptions = {};
            oNgbModalOptions.backdrop = 'static';

            this.oNgbModalRef = this.modalService.open(this.content, oNgbModalOptions);
            this.oNgbModalRef.result.then((result) => { });
        }
    }

    Stop(): void {
        this.counter = this.counter - 1;
        if (this.counter === 0) {
            if (this.oNgbModalRef) {
                this.oNgbModalRef.close();
                this.oNgbModalRef = undefined;
            }
        }
    }
}
