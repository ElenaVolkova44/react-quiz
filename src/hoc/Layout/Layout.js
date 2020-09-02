import React, {Component} from "react";
import classes from './Layout.module.css';
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import Drawer from "../Navigation/Drawer/Drawer";

class Layout extends Component {

   state = {
      menu: false
   };

   toggleMenuHandler = () => {
      this.setState({
         menu: !this.state.menu
      })
   };

   onCloseHandler = () => {
      this.setState({
         menu: false
      });
   };

   render() {
      return (
         <div className={classes.Layout}>
            <Drawer
               onClose={this.onCloseHandler}
               isOpen={this.state.menu}
            />
            <MenuToggle
               isOpen={this.state.menu}
               onToggle={this.toggleMenuHandler}
            />
            <main>
               {this.props.children}
            </main>
         </div>
      )
   }
}

export default Layout;
