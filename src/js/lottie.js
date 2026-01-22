import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import lottie from 'lottie-web'

export default class Lottie {
    constructor() {
        this.load()
        window.addEventListener('load', ()=>{
            ScrollTrigger.refresh()
        })
    }

    load() {
        const items = document.querySelectorAll('.js-lottie')
        if (items.length > 0) {

            items.forEach( item => {
                const once = !!item.dataset.once
                const animation = lottie.loadAnimation({
                    container: item,
                    renderer: 'svg', // or 'canvas' / 'html'
                    loop: !once,
                    autoplay: !once,
                    path: item.dataset.src
                });
                if (once) {
                    ScrollTrigger.create({
                        trigger: item,
                        start: "top 70%",
                        once: true,
                        onEnter: () => {
                            animation.goToAndPlay(0, true);
                        }
                    });
                }
            })
        }
    }

}
