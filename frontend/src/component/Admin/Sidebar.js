import React from 'react';
import './Sidebar.css';
import logo from "../../images/logo2.png";
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'


const Sidebar = () => {
  return (
    <div className="sidebar">
         <Link to="/">
         <img src={logo} alt="Ecommerce" />
         </Link>
         <Link to="/admin/dashboard">
         <p>
          <DashboardIcon /> Dashboard
        </p>
         </Link>
         <SimpleTreeView
          collapseIcon={<ImportExportIcon />}
          endIcon={<ExpandMoreIcon />}
        >
             <TreeItem itemId="1" label="Products">
             <Link to="/admin/products">
             <TreeItem itemId="2" label="All" collapseIcon={<PostAddIcon />} />
             </Link>
             <Link to="/admin/product">
              <TreeItem itemId="3" label="Create" icon={<AddIcon />} />
            </Link>
         
             </TreeItem>
             </SimpleTreeView>
             <Link to="/admin/allorders">
        <p>
          <ListAltIcon />
          Orders
        </p>
         </Link>
         <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
        </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}

export default Sidebar
