import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.page.html',
  styleUrls: ['./animacion.page.scss'],
})
export class AnimacionPage implements AfterViewInit {

  anim: Animation;
  @ViewChild('square', {static: false}) square: ElementRef;
  isPlaying = false;

  constructor(private animationCtrl: AnimationController) { }

  ngAfterViewInit(){
    this.anim = this.animationCtrl.create('myAnim');
    this.anim.addElement(this.square.nativeElement)
    .duration(1500)
    .easing('ease-out')
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(300px)')
    .fromTo('opacity', 1, 0.2);
  }

  Animacion(){
    if(this.isPlaying){
      this.anim.stop();
    } else {
      this.anim.play();
    }
    this.isPlaying = !this.isPlaying;
  }


}
