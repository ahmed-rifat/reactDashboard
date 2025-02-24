import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import authService from '../Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const SubMenu = () => {
    const [SubMenuData, setSubMenuData] = useState({
      menu_id: '',
      sub_menu_name: '',
      base_url: '',
      menu_order_no: '',
      menu_icon: '',
      active_yn: '',
    });
  
  const [SubMenuDetails, setSubMenuDetails] = useState([]);
  const [MenuDetails, setMenuDetails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubMenuData({ ...SubMenuData, [name]: value
    });
  };

  const handleSubmit = async (e) => {
    console.log('payload' ,SubMenuData);
    e.preventDefault();
    try {
      if (SubMenuData.sub_menu_id) {
        const response = await authService.updateSubMenu(SubMenuData.sub_menu_id, SubMenuData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      } else {
        const response = await authService.createSubMenu(SubMenuData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      }
      getSubMenuDetails();
      setSubMenuData({ 
        sub_menu_name: '',
        base_url: '', 
        menu_order_no: '', 
        menu_icon: '', 
        active_yn: '' 
    });
  
    } catch (error) {
      toast.error('Failed to submit the menu.', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
  };
  

  const handleEdit = async(id) => {
    const updateData = await authService.getSubMenuById(id);
    setSubMenuData(updateData.submenu);    
  };

  const getSubMenuDetails = async() => { 
    const response = await authService.getSubMenuById();
    if (response.sub_menus) {
      setSubMenuDetails(response.sub_menus);
    }
  };

  const getAllSubmenus = async() => {
    const response = await authService.getAllSubMenu(); 
    if (response.submenus) {
        setSubMenuDetails(response.submenus);
    }
    };  

  const getActiveMenuDetails = async() => { 
    const response = await authService.getAllActiveMenu();
    if (response.menus) {
      setMenuDetails(response.menus);
    }
  };


  useEffect(() => {
    getSubMenuDetails();
    getActiveMenuDetails();
    getAllSubmenus();
  }, []);

  return (
    <DefaultLayout>
    <>
      <Breadcrumb pageName="Menu" />
           <div className="grid grid-cols gap-9">
             <div className="flex flex-col gap-9">
               <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">  
                 <div className="flex flex-col gap-5.5 p-6.5">
                 <div>
                    <label className="mb-3 block text-lg text-black dark:text-white">
                        Parent Menu Name
                    </label>
                    <select
                        name="menu_id"
                        value={SubMenuData.menu_id}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    >
                        <option disabled value="">Select parent menu</option>
                        {MenuDetails.map((option) => (
                        <option
                            key={option.menu_id}
                            value={option.menu_id}
                        >
                            {option.menu_name}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                     <label className="mb-3 block text-lg text-black dark:text-white">
                      Sub Menu Name
                     </label>
                     <input
                       type="text"
                       name='sub_menu_name'
                       value={SubMenuData.sub_menu_name}
                       onChange={handleInputChange}
                       placeholder="Enter sub menu name"
                       className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                     />
                   </div>
                  <div>
                     <label className="mb-3 block text-lg text-black dark:text-white">
                        Base Url
                     </label>
                     <input
                       type="text"
                       name='base_url'
                       value={SubMenuData.base_url}
                       onChange={handleInputChange}
                       placeholder="Enter base url"
                       className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                     />
                   </div>
                 </div>
                 <div className="py-4 px-6.5">
                     <h3 className="font-medium text-black text-lg dark:text-white">
                        Sub Menu Order No
                     </h3>
                     <input
                        type="number"
                        name='menu_order_no'
                        value={SubMenuData.menu_order_no}
                        onChange={handleInputChange}
                        placeholder="Enter sub menu order no"
                        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                     />
                    </div>
                <div className="py-4 px-6.5">
                    <h3 className="font-medium text-black text-lg dark:text-white">
                        Sub Menu Icon
                    </h3>
                    <input
                        type="text"
                        name='menu_icon'
                        value={SubMenuData.menu_icon}
                        onChange={handleInputChange}
                        placeholder="Enter menu icon"
                        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                </div>

                 <div className="py-4 px-6.5">
                   <h3 className="font-medium text-black text-lg dark:text-white">
                     Active Status
                   </h3>
                 </div>
                 <div className="flex gap-3">
                  <div className="flex items-center gap-3 p-6.5 text-lg"> 
                 <label for="active">Yes</label>            
                 <input type="radio"
                  id="active" 
                  name="active_yn" 
                  value="Y"
                  checked={SubMenuData.active_yn === 'Y'}
                  onChange={handleInputChange}
                  />
                 </div>
                 <div className="flex items-center gap-3 p-6.5 text-lg">
                 <label for="inActive">No</label>            
                 <input type="radio" 
                 id="inActive" 
                 name="active_yn" 
                 value="N"
                 checked={SubMenuData.active_yn === 'N'}
                 onChange={handleInputChange}
                 />
                 </div>
                 </div>
                 <button onClick={handleSubmit} className="ml-6 bg-blue-500 mt-3 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                 Submit
                 </button>
               </div>
             </div>
           </div>
           {/* table here */}      
     
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg border rounded-lg mt-4">
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-6">
             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                 <tr>
                     <th scope="col" className="px-6 py-3">
                         Sub Menu Name
                     </th>
                     <th scope="col" className="px-6 py-3">
                         Base Url
                        </th>
                    <th scope="col" className="px-6 py-3">
                            Sub Menu Order No
                        </th>
                    <th scope="col" className="px-6 py-3">
                           Sub Menu Icon
                        </th>
                     <th scope="col" className="px-6 py-3">
                         Status
                     </th>
                     <th scope="col" className="px-6 py-3">
                         Action
                     </th>
                 </tr>
             </thead>
             <tbody>
             {SubMenuDetails.map((subsubMenuItem, key) =>
                 <tr key={subsubMenuItem.sub_menu_id}  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {subsubMenuItem.sub_menu_name}
                     </th>
                    <td className="px-6 py-4">
                            {subsubMenuItem.base_url}
                        </td>
                    <td className="px-6 py-4">
                            {subsubMenuItem.menu_order_no}
                        </td>
                    <td className="px-6 py-4">
                            {subsubMenuItem.menu_icon}
                        </td>
                     <td className="px-6 py-4">
                          {subsubMenuItem.active_yn === 'Y' ? 'Active' : 'In Active'}
                     </td>
                     <td className="px-6 py-4">
                         <span>
                         <a onClick={(e) => {
                           e.preventDefault(); 
                           handleEdit(subsubMenuItem.sub_menu_id);
                         }}
                         href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                         </span>
                     </td>
                 </tr>
             )}
             </tbody>
         </table>
     </div>
           
           <ToastContainer />
      
    </>
    </DefaultLayout>
  );
};

export default SubMenu;
