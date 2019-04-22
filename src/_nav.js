import React from 'react'

export default {
  items: [
    /*  {
       name: 'Dashboard',
       url: '/dashboard',
       icon: 'icon-speedometer',
       badge: {
         variant: 'info',
         text: 'NEW',
       },
     },
  */



    {
      name: <b style={{ fontSize: 15, color: "#8bc34a" }} onClick={(e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.classList.toggle('open');
      }}>企业管理</b>,
      icon: 'icon-puzzle',
      children: [
        {
          name: '　企业列表',
          url: '/owner/companies',
          icon: ["icon-puzzle","right-padding"],
        }]
    },
    /*  {
       name: '企业入驻',
       url: '/property/department',
       icon: 'icon-location-pin',
     }, */
    {
      name: <b style={{ fontSize: 15, color: "#8bc34a" }} onClick={(e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.classList.toggle('open');
      }}>住宅管理</b>,
      icon:'icon-layers',
      children: [{
        name: '　户主分配管理',
        url: '/info/buildings',
        icon:["icon-layers","right-padding"],
      },
      {
        name: '　住户列表',
        url: '/inhabitant/owners',
        icon:["icon-layers","right-padding"],
      },
      {
        name: '　导入业主',
        url: '/inhabitant/importOwners',
        icon:["icon-layers","right-padding"],
      }, {
        name: '　导入门禁卡',
        url: '/inhabitant/importCards',
        icon:["icon-layers","right-padding"],
      }, {
        name: '　门禁卡管理',
        url: '/inhabitant/ownerCards',
        icon:["icon-layers","right-padding"],
      }]
    },
    {
      name: <b style={{ fontSize: 15, color: "#8bc34a" }} onClick={(e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.classList.toggle('open');
      }}>公告管理</b>,
      icon: 'icon-pie-chart',
      children: [
        {
          name: '　公告列表',
          url: '/property/notice',
          icon: ["icon-pie-chart","right-padding"],           
        }]
    },
    {
      name: <b style={{ fontSize: 15, color: "#8bc34a" }} onClick={(e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.classList.toggle('open');
      }}>物业管理</b>,
      icon: 'icon-location-pin',
      /*  wrapper: {            // optional wrapper object
         element: 'div',        // required valid HTML5 element tag
         attributes: { style: { fontSize: 15, color: "#8bc34a" } }        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
       }, */
      children: [
        {
          name: '　物业报修',
          url: '/property/ticket',
          icon: ["icon-location-pin","right-padding"],
        },
        {
          name: '　客服热线',
          url: '/property/hotlines',
          icon: ["icon-location-pin","right-padding"],
        },
        {
          name: '　物业卡管理',
          url: '/property/CardManaged',
          icon: ["icon-location-pin","right-padding"],
        }, {
          name: '　出入记录',
          url: '/inhabitant/entranceLog',
          icon:["icon-layers","right-padding"],
        }, {
          name: '　门禁设备状态监控',
          url: '/property/HardwareStatus',
          icon: ["icon-location-pin","right-padding"],
        }, {
          name: '　消息接收设置',
          url: '/property/MsgPhone',
          icon: ["icon-location-pin","right-padding"],
        }]
    },


/* 
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Download CoreUI',
      url: 'http://coreui.io/react/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
    },
    {
      name: 'Try CoreUI PRO',
      url: 'http://coreui.io/pro/react/',
      icon: 'icon-layers',
      variant: 'danger',
    }, */

  ],
};
