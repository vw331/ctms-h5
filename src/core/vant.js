import {
  NavBar,
  Tabbar, 
  TabbarItem,
  Button,
  Tag,
  Col,
  Icon,
  Cell,
  Form, 
  Field,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Image,
  Loading,
  Dialog,
  List,
  PullRefresh,
  Calendar
} from 'vant';

export default {
  install: (app) => {
    [
      NavBar,
      Button,
      Tag,
      Col,
      Icon,
      Cell,
      Form, 
      CellGroup,
      Field,
      Swipe,
      Toast,
      Tabbar, 
      TabbarItem,
      SwipeItem,
      ActionBar,
      ActionBarIcon,
      ActionBarButton,
      Image,
      Loading,
      Dialog,
      List,
      PullRefresh,
      Calendar
    ].forEach(component => {
      app.use(component)
    })
  }
}