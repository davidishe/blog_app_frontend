import { Component, OnInit, Input } from '@angular/core';
import { useAnimation, trigger, transition } from '@angular/animations';
import { bounce, bounceOutUp } from 'ng-animate';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('bounce', [
      transition('void => *', useAnimation(bounce, {params: { timing: 1, delay: 0 }})),
      transition('* => void', useAnimation(bounceOutUp, {params: { timing: 2, delay: 0 }})),
    ]
    )
  ],
})
export class ToastComponent implements OnInit {

  @Input() visible: boolean;
  @Input() color: string;
  @Input() message: string;

  warning: boolean;
  information: boolean;
  success: boolean;


  constructor() { }

  ngOnInit() {
    console.log(this.color);
  }

}
