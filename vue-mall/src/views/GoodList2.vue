<template>
  <div>
    <nav-header></nav-header>    <!--按照w3c规范，这里需要小写，NavHeader就成了nav-header-->
    <nav-bread>
      <span slot="bread">Goods</span>
      <span slot="bread2">list</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter 这里是响应式部署，估计是看看css才知道-->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setChoose(index)" :class="{'cur':priceChecked==index}">{{price.startPrice}}
                  -- {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="goods in goodLists">
                  <div class="pic">
                    <a href="#">
                      <img v-bind:src="goods.pic" alt="">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.name}}</div>
                    <div class="price">{{goods.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <a-button shape="circle" loading v-show="loadMsgShow" />
                <!--<img src="@/assets/svg/Spinner-1s-200px.svg" >-->
                <span v-show="!loadMsgShow">{{loadMoreMsg}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLay" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import "./../assets/css/base.css"
  import "@/assets/css/product.css"
  import NavHeader from "./../components/NavHeader"
  import NavFooter from "./../components/NavFooter"
  import NavBread from "./../components/NavBread"
  import axios from "axios"

  export default {
    name: "GoodList2",
    mounted() {
      this.getGoodsList()
    },
    data() {
      return {
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00',
          },
          {
            startPrice: '100.00',
            endPrice: '500.00',
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00',
          },
          {
            startPrice: '1000.00',
            endPrice: '2000.00',
          },
        ],
        priceChecked: 'all',
        filterBy: false,
        overLay: false,
        goodLists: [],
        page: 1,
        pageSize: 4,
        busy: true,
        loadMoreMsg:"loadingMore",
        loadMsgShow:true
      }
    },
    components: {
      NavHeader,//这里默认解析成NavHeader:NavHeader的key value形式。es6语法。
      NavFooter,
      NavBread,
    },
    methods: {
      showFilterPop() {
        this.filterBy = true;
        this.overLay = true
      },
      closePop() {
        this.filterBy = false;
        this.overLay = false
      },
      setChoose(index) {
        this.priceChecked = index;
        if (this.filterBy && this.overLay) {
          this.closePop();
        }
      },
      getGoodsList(flag) {
        axios.get("http://127.0.0.1:3600/goods/list", {
          params: {
            page: this.page,
            size: this.pageSize,
          }
        }).then(res => {
          if (flag) {
            this.goodLists = this.goodLists.concat(res.data.body.models);
          } else {
            this.goodLists = res.data.body.models;
          }
          this.busy = res.data.body.models.length == 0;
          this.loadMsgShow = res.data.body.models.length == 0 ? false:true;
          this.loadMoreMsg = res.data.body.models.length == 0? "no more goods" : " loading more"
        }).catch(error => {
          this.goodLists = [];
          this.busy = true;
          console.log(error)
        })
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
          this.busy = false;
        }, 100);//100ms 内不会频繁请求，避免服务器压力，

      }
    }
  }
</script>
