import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import authService from '../Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Faq = () => {
  const [faqData, setFaqData] = useState(
    {
      faq_title: '',
      faq_description: '',
      active_yn: '',
    }
  );

  const [faqDetails, setFaqDetails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await authService.createFaq(faqData);
    if (response?.message) {
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }else{
      toast.error(response?.message, {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
    getFaqDetails();
  };

  const handleEdit = async(id) => {
    console.log(id);
    const response =  await authService.updateFaq(id);
    setFaqData(response.faq);
  };

  const getFaqDetails = async() => { 
    const response = await authService.getFaq();
    if (response.faq) {
      setFaqDetails(response.faq);
    }
  };


  const deleteFaq = async(id) => {
    const response = await authService.deleteFaq(id);
    if (response?.message) {
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }else{
      toast.error(response?.message, {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
  };


  useEffect(() => {
    getFaqDetails();
  }, []);
    
  return (
  
    <>
    <DefaultLayout>
      <Breadcrumb pageName="FAQ Section" />

      <div className="grid grid-cols gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">  
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-lg text-black dark:text-white">
                 Title
                </label>
                <input
                  type="text"
                  name='faq_title'
                  value={faqData.faq_title}
                  onChange={handleInputChange}
                  placeholder="Enter faq_title"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>
              <div>
                <label className="mb-3 block text-lg text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  name='faq_description'
                  placeholder="faq_description"
                  value={faqData.faq_description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
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
             checked={faqData.active_yn === 'Y'}
             onChange={handleInputChange}
             />
            </div>
            <div className="flex items-center gap-3 p-6.5 text-lg">
            <label for="inActive">No</label>            
            <input type="radio" 
            id="inActive" 
            name="active_yn" 
            value="N"
            checked={faqData.active_yn === 'N'}
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
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
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
        {faqDetails.map((faqItem, key) =>
            <tr key={faqItem.faq_id}  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {faqItem.faq_title}
                </th>
                <td className="px-6 py-4">
                    {faqItem.faq_description}
                </td>
                <td className="px-6 py-4">
                     {faqItem.active_yn === 'Y' ? 'Active' : 'InActive'}
                </td>
                <td className="px-6 py-4">
                    <span>
                    <a onClick={(e) => {
                      e.preventDefault(); 
                      handleEdit(faqItem.faq_id);
                    }}
                    href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </span>

                    <span className='ml-3'>
                    <a onClick={(e) => {
                      e.preventDefault(); 
                      deleteFaq(faqItem.faq_id);
                    }}
                    href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                    </span>
                </td>
            </tr>
        )}
        </tbody>
    </table>
</div>
      
      <ToastContainer />
      </DefaultLayout>
    </>
  );
};

export default Faq;
