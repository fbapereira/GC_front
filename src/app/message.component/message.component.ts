import { OnInit, Component, ViewChild, Input } from "@angular/core";
import { MessageUI } from "../models/messageUI";

@Component({
    selector: 'app-gc-message',
    templateUrl: './message.component.html'
})

export class MessageComponent {
    @Input()
    messages: MessageUI[] = [];
}
