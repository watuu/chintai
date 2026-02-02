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
        this.pMediaChintiger()
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

            let prevStep = 1;
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

                    const step = (p < 1/3) ? 1 : (p < 2/3) ? 2 : 3;

                    if (step !== prevStep) {
                        prevStep = step;
                        setStepClass(step);

                        const targetSvg = svgs[step - 1];
                        const lines = targetSvg.querySelectorAll('.line');

                        gsap.killTweensOf(lines);

                        gsap.set(lines, { drawSVG: "0% 0%" });
                        gsap.to(lines, {
                            drawSVG: "0% 100%",
                            duration: 1.5,
                            ease: "power3.out",
                            stagger: 0.03
                        });
                    } else {
                        setStepClass(step);
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

    pMediaChintiger() {
        if (document.querySelector('.p-media-chintiger-profile__block2Text .swiper')) {
            const swiper = new Swiper('.p-media-chintiger-profile__block2Text .swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 0,
                // effect: 'fade',
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                on: {
                    slideChangeTransitionStart(swiper) {
                        // キャプション
                        const captions = document.querySelectorAll(
                            '.p-media-chintiger-profile__block2Pic figcaption p'
                        );
                        captions.forEach(p => {
                            p.style.display = 'none';
                        });
                        const index = swiper.realIndex;
                        if (captions[index]) {
                            captions[index].style.display = 'block';
                        }

                        // 文字
                        document.querySelectorAll('.p-media-chintiger-profile__block2Text .swiper-slide span span').forEach(s => {
                            s.style.display = 'none';
                        });

                        const activeSlide = swiper.slides[swiper.activeIndex];
                        const chars = activeSlide.querySelectorAll('span span');

                        chars.forEach((char, i) => {
                            setTimeout(() => {
                                char.style.display = 'inline-block';
                            }, i * 50);
                        });
                    }
                }
            });
        }
    }
}

