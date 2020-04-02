import Vue from 'vue'
import { Button,
  Form,
  FormItem,
  Input,
  Col,
  Row,
  Message,
  Container,
  Header,
  Main,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popconfirm,
  MessageBox

} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Col)
Vue.use(Row)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Popconfirm)
