import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import authService from './Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Role = () => {
  const [RoleData, setRoleData] = useState(
    {
      role_name: '',
      role_key: '',
      grant_all_yn: '',
      active_yn: '',
}
  );
  const [RoleDetails, setRoleDetails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...RoleData, [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (RoleData.role_id) {
        const response = await authService.updateRole(RoleData.role_id, RoleData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      } else {
        const response = await authService.createRole(RoleData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      }
      getRoleDetails();
      setRoleData({ role_name: '', role_key: '', grant_all_yn: '', active_yn: '' }); 
  
    } catch (error) {
      toast.error('Failed to submit the role.', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
  };
  

  const handleEdit = async(id) => {
    const updateData = await authService.getRoleById(id);
    setRoleData(updateData.role);    
  };

  const getRoleDetails = async() => { 
    const response = await authService.getAllRole();
    if (response.menus) {
      setRoleDetails(response.menus);
    }
  };


  useEffect(() => {
    getRoleDetails();
  }, []);

  return (
    <DefaultLayout>
    <>
      <Breadcrumb pageName="Role" />
           <div className="grid grid-cols gap-9">
             <div className="flex flex-col gap-9">
               <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">  
                 <div className="flex flex-col gap-5.5 p-6.5">
                   <div>
                     <label className="mb-3 block text-lg text-black dark:text-white">
                      Role Name
                     </label>
                     <input
                       type="text"
                       name='role_name'
                       value={RoleData.role_name}
                       onChange={handleInputChange}
                       placeholder="Enter role name"
                       className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                     />
                   </div>
                   
                   <div>
                     <label className="mb-3 block text-lg text-black dark:text-white">
                      Role Key
                     </label>
                     <input
                       type="text"
                       name='role_key'
                       value={RoleData.role_key}
                       onChange={handleInputChange}
                       placeholder="Enter role key"
                       className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                     />
                   </div>
                 </div>
                 <div className="py-4 px-6.5">
                   <h3 className="font-medium text-black text-lg dark:text-white">
                     Grant Status
                   </h3>
                 </div>
                 <div className="flex gap-3">
                  <div className="flex items-center gap-3 p-6.5 text-lg"> 
                 <label for="active">Yes</label>            
                 <input type="radio"
                  id="active" 
                  name="grant_all_yn" 
                  value="Y"
                  checked={RoleData.grant_all_yn === 'Y'}
                  onChange={handleInputChange}
                  />
                 </div>
                 <div className="flex items-center gap-3 p-6.5 text-lg">
                 <label for="inActive">No</label>            
                 <input type="radio" 
                 id="inActive" 
                 name="grant_all_yn" 
                 value="N"
                 checked={RoleData.grant_all_yn === 'N'}
                 onChange={handleInputChange}
                 />
                 </div>
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
                  checked={RoleData.active_yn === 'Y'}
                  onChange={handleInputChange}
                  />
                 </div>
                 <div className="flex items-center gap-3 p-6.5 text-lg">
                 <label for="inActive">No</label>            
                 <input type="radio" 
                 id="inActive" 
                 name="active_yn" 
                 value="N"
                 checked={RoleData.active_yn === 'N'}
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
                         Role Name
                     </th>
                      <th scope="col" className="px-6 py-3">
                          Role Key
                      </th>
                      <th scope="col" className="px-6 py-3">
                              Grant All
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
             {RoleDetails.map((roleItem, key) =>
                 <tr key={roleItem.role_id}  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {roleItem.role_name}
                     </th>
                      <td className="px-6 py-4">
                          {roleItem.role_key}
                      </td>
                      <td className="px-6 py-4">
                          {roleItem.grant_all_yn === 'Y' ? 'Yes' : 'No'}
                      </td>
                     <td className="px-6 py-4">
                          {roleItem.active_yn === 'Y' ? 'Active' : 'InActive'}
                     </td>
                     <td className="px-6 py-4">
                         <span>
                         <a onClick={(e) => {
                           e.preventDefault(); 
                           handleEdit(roleItem.role_id);
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

export default Role;
