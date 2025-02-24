import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import authService from './Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Subscription = () => {
   
  const [subscriptionDetails, setsubscriptionDetails] = useState([]);


  const getAllSubscription = async() => {
    const response = await authService.getAllSubscription(); 
    if (response.subcriptions) {
        setsubscriptionDetails(response.subcriptions);
    }
    };  



  useEffect(() => {
    getAllSubscription();
  }, []);

  return (
    <DefaultLayout>
    <>
      <Breadcrumb pageName="Subscription" />
           {/* table here */}      
     
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg border rounded-lg mt-4">
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-6">
             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                 <tr>
                     <th scope="col" className="px-6 py-3">
                         Name
                     </th>
                    <th scope="col" className="px-6 py-3">
                           Email
                        </th>
                 </tr>
             </thead>
             <tbody>
             {subscriptionDetails.map((subsubMenuItem, key) =>
                 <tr key={subsubMenuItem.subscription_id}  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {subsubMenuItem.name}
                     </th>
                    <td className="px-6 py-4">
                            {subsubMenuItem.email}
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

export default Subscription;
