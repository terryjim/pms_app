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
      title: true,
      name: '楼栋信息管理',
      wrapper: {            // optional wrapper object
        element: '楼栋信息管理',        // required valid HTML5 element tag
        attributes: {style: {fontSize: 15,color:"#8bc34a"}}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      //url: '/base',
     // icon: 'icon-globe',
      /* wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '' ,  */           // optional class names space delimited list for title item ex: "text-center"
      //class: 'h3' 
    },  
        {
          name: '楼栋列表',
          url: '/project/project',
          icon: 'icon-layers',
        }   
   ,
  
    {
      title: true,
      name: '企业管理',
      wrapper: {            // optional wrapper object
        element: '企业管理',        // required valid HTML5 element tag
        attributes: {style: {fontSize: 15,color:"#8bc34a" }}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      //url:'/theme',
      /* wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      }, */
     // icon: 'icon-energy',
      //class: '',             // optional class names space delimited list for title item ex: "text-center"
    },
      {
        name: '企业列表',
        url: '/property/setting',
        icon: 'icon-settings',
      },
      {
        name: '企业入驻',
        url: '/property/department',
        icon: 'icon-location-pin',
      },
      {
        title: true,
        name: '住宅管理',
        wrapper: {            // optional wrapper object
          element: '住宅管理',        // required valid HTML5 element tag
          attributes: {style: {fontSize: 15,color:"#8bc34a" }}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        //url:'/theme',
        /* wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        }, */
       // icon: 'icon-energy',
        //class: '',             // optional class names space delimited list for title item ex: "text-center"
      },
        {
          name: '住宅列表',
          url: '/property/setting',
          icon: 'icon-settings',
        },
        {
          name: '导入业主',
          url: '/property/department',
          icon: 'icon-location-pin',
        },
        {
          title: true,
          name: '门禁管理',
          wrapper: {            // optional wrapper object
            element: '门禁管理',        // required valid HTML5 element tag
            attributes: {style: {fontSize: 15,color:"#8bc34a" }}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          //url:'/theme',
          /* wrapper: {            // optional wrapper object
            element: '',        // required valid HTML5 element tag
            attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          }, */
         // icon: 'icon-energy',
          //class: '',             // optional class names space delimited list for title item ex: "text-center"
        },
          {
            name: '门禁列表',
            url: '/property/setting',
            icon: 'icon-settings',
          },
          {
            title: true,
            name: '停车管理',
            wrapper: {            // optional wrapper object
              element: '停车管理',        // required valid HTML5 element tag
              attributes: {style: {fontSize: 15,color:"#8bc34a" }}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            //url:'/theme',
            /* wrapper: {            // optional wrapper object
              element: '',        // required valid HTML5 element tag
              attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            }, */
           // icon: 'icon-energy',
            //class: '',             // optional class names space delimited list for title item ex: "text-center"
          },
            {
              name: '停车道闸列表',
              url: '/property/setting',
              icon: 'icon-settings',
            },
            {
              title: true,
              name: '公告管理',
              wrapper: {            // optional wrapper object
                element: '公告管理',        // required valid HTML5 element tag
                attributes: {style: {fontSize: 15,color:"#8bc34a" }}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
              },
              //url:'/theme',
              /* wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
              }, */
             // icon: 'icon-energy',
              //class: '',             // optional class names space delimited list for title item ex: "text-center"
            },
              {
                name: '公告列表',
                url: '/property/setting',
                icon: 'icon-settings',
              },
              {
                title: true,
                name: '物业管家',
                wrapper: {            // optional wrapper object
                  element: '物业管家',        // required valid HTML5 element tag
                  attributes: {style: {fontSize: 15,color:"#8bc34a" }}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
                },
                //url:'/theme',
                /* wrapper: {            // optional wrapper object
                  element: '',        // required valid HTML5 element tag
                  attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
                }, */
               // icon: 'icon-energy',
                //class: '',             // optional class names space delimited list for title item ex: "text-center"
              },
                {
                  name: '工单管理',
                  url: '/property/setting',
                  icon: 'icon-settings',
                },
                {
                  name: '客服定理',
                  url: '/property/department',
                  icon: 'icon-location-pin',
                },
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
    },
   
  ],
};
