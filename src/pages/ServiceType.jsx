import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import authService from './Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const ServiceType = () => {
  const [serviceTypeData, setServiceTypeData] = useState(
    {
      service_type_name: '',
      active_yn: '',
      service_type_id : ''
    }
  );
  const [serviceDetails, setServiceDetails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceTypeData({ ...serviceTypeData, [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (serviceTypeData.service_type_id) {
        const response = await authService.updateServiceType(serviceTypeData.service_type_id, serviceTypeData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      } else {
        const response = await authService.createServiceType(serviceTypeData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      }
      getserviceDetails();
      setServiceTypeData({ service_type_name: '', service_description: '', active_yn: '' }); 
  
    } catch (error) {
      toast.error('Failed to submit the Service.', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
  };
  

  const handleEdit = async(id) => {
    const updateData = await authService.getServiceTypeById(id);
    setServiceTypeData(updateData.serviceType);    
  };

  const getserviceDetails = async() => { 
    const response = await authService.getAllServiceType();
    if (response.serviceTypes) {
      setServiceDetails(response.serviceTypes);
    }
  };


  useEffect(() => {
    getserviceDetails();
  }, []);

  return (
    <DefaultLayout>
    <>
      <Breadcrumb pageName="Service Type" />
           <div className="grid grid-cols gap-9">
             <div className="flex flex-col gap-9">
               <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">  
                 <div className="flex flex-col gap-5.5 p-6.5">
                   <div>
                     <label className="mb-3 block text-lg text-black dark:text-white">
                      Service Type Name
                     </label>
                     <input
                       type="text"
                       name='service_type_name'
                       value={serviceTypeData.service_type_name}
                       onChange={handleInputChange}
                       placeholder="Enter service Type name"
                       className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
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
                  checked={serviceTypeData.active_yn === 'Y'}
                  onChange={handleInputChange}
                  />
                 </div>
                 <div className="flex items-center gap-3 p-6.5 text-lg">
                 <label for="inActive">No</label>            
                 <input type="radio" 
                 id="inActive" 
                 name="active_yn" 
                 value="N"
                 checked={serviceTypeData.active_yn === 'N'}
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
                         Service Type Name
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
             {serviceDetails.map((serviceItem, key) =>
                 <tr key={serviceItem.service_type_id}  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {serviceItem.service_type_name}
                     </th>
                     <td className="px-6 py-4">
                          {serviceItem.active_yn === 'Y' ? 'Active' : 'InActive'}
                     </td>
                     <td className="px-6 py-4">
                         <span>
                         <a onClick={(e) => {
                           e.preventDefault(); 
                           handleEdit(serviceItem.service_type_id);
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

export default ServiceType;
