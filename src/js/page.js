import $ from "jQuery";
import Utility from './utility';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import Swiper, { Navigation, Pagination, Autoplay, Scrollbar, EffectFade } from 'swiper';
import 'swiper/css/bundle'
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar, EffectFade]);

export default class Page {
    constructor() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        if (document.querySelector('.cm-xxx')) {
            //
        }
        this.pCompanyPhilosophy()
        this.pCompanyHistory()
        this.pMedia()
    }

    pCompanyPhilosophy() {
        if (document.querySelector('.p-company-philosophy')) {

            const section = document.querySelector('.p-company-philosophy');
            const wrap = document.querySelector('.p-company-philosophy__wrap');
            const svgs = gsap.utils.toArray('.p-company-philosophy-figure__pic svg');
            const items = gsap.utils.toArray('.p-company-philosophy-item');

            // svgs.forEach((svg, i) => {
            //     gsap.set(svg, { opacity: i === 0 ? 1 : 0 });
            // });
            // items.forEach((item, i) => {
            //     gsap.set(item, { display: i === 0 ? 'block' : 'none' });
            // });

            /* ========== PIN留め ========= */
            ScrollTrigger.create({
                trigger: section,
                start: () => {
                    const wrapRect = wrap.getBoundingClientRect();
                    return `top+=${wrapRect.height / 2} center` ;
                },
                end: () => {
                    const wrapRect = wrap.getBoundingClientRect();
                    return `bottom-=${wrapRect.height / 2} center` ;
                },
                pin: wrap,
                scrub: true,
                markers: false,
            });

            /* ========== ブロック切り替え ========= */
            const setStepClass = (step) => {
                section.classList.remove('is-step-1', 'is-step-2', 'is-step-3');
                section.classList.add(`is-step-${step}`);
            };

            setStepClass(1);

            ScrollTrigger.create({
                trigger: section,
                start: () => 'top center',
                end: () => {
                    const wrapRect = wrap.getBoundingClientRect();
                    return `bottom center`;
                },
                scrub: true,
                markers: false,
                onUpdate: self => {
                    const p = self.progress;

                    if (p < 1 / 3) {
                        setStepClass(1);
                    } else if (p < 2 / 3) {
                        setStepClass(2);
                    } else {
                        setStepClass(3);
                    }
                }
            });
        }
    }

    pCompanyHistory() {
        if (document.querySelector('.p-company-history-timeline')) {
            const timeline = document.querySelector('.p-company-history-timeline');
            const line = timeline.querySelector('.p-company-history-timeline__line');
            const indicator = line.querySelector('.indicator');
            const nikukyu = line.querySelector('.nikukyu');

            gsap.set(indicator, { height: '0%' });
            gsap.set(nikukyu, { top: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: timeline,
                    start: 'top 60%',
                    end: 'bottom 60%',
                    scrub: true,
                    // markers: true,
                }
            })
                .to(indicator, {
                    height: '100%',
                    ease: 'none'
                }, 0)
                .to(nikukyu, {
                    top: '100%',
                    ease: 'none'
                }, 0);

        }

    }

    pMedia() {
        const tabs = document.querySelectorAll('.js-btn-mediaTab');
        const contentsLead = document.querySelectorAll('.js-content-mediaLead');
        const contents = document.querySelectorAll('.js-content-media');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('is-active'));
                contentsLead.forEach(c => c.classList.remove('is-active'));
                contents.forEach(c => c.classList.remove('is-active'));

                tab.classList.add('is-active');
                contentsLead[index].classList.add('is-active');
                contents[index].classList.add('is-active');
            });
        });

        if (tabs.length > 0 && contents.length > 0) {
            tabs[0].classList.add('is-active');
            contentsLead[0].classList.add('is-active');
            contents[0].classList.add('is-active');
        }
    }
}

