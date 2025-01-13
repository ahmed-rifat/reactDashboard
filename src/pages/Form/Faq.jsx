import React, { useState } from 'react';
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
  };
    
  return (
  
    <>
    <DefaultLayout>
      <Breadcrumb pageName="FAQ Section" />

      <div className="grid grid-cols-2 gap-9">
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
          </div>
        </div>
      </div>
      
      <button onClick={handleSubmit} className="bg-blue-500 mt-3 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Submit
      </button>

      {/* table here */}
      
      <ToastContainer />
      </DefaultLayout>
    </>
  );
};

export default Faq;
