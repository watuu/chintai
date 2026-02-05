window.constants = {
    enabled_legacy_browser: false,
}
import {default as Common} from './common';
// import Barba from './barba';
import Page from './page';
import Lottie from "./lottie";
import BudouX from './budoux';
import initTopNews from './top-news';

class APP {
    constructor() {
        const common = new Common();
        common.load();
        // new Barba();
        new Page();
        new Lottie();
        new BudouX();
        initTopNews();
    }
}

new APP()