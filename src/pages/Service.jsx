import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import authService from './Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Service = () => {
  const [serviceData, setServiceData] = useState({
    service_types_id: '',
    service_name: '',
    service_min_price: '',
    service_max_price: '',
    service_title: '',
    service_description: '',
    service_attachment: '',
    active_yn: '',
  });
  const [serviceDetails, setServiceDetails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setServiceData({ ...serviceData, [name]: value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (serviceData.service_types_id) {
        const response = await authService.updateService(
          serviceData.service_types_id,
          serviceData,
        );
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      } else {
        const response = await authService.createService(serviceData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      }
      getserviceDetails();
      setServiceData({
        service_name: '',
        service_min_price: '',
        service_max_price: '',
        service_title: '',
        service_description: '',
        service_attachment: '',
        active_yn: '',
      });
    } catch (error) {
      toast.error('Failed to submit the Service.', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
  };

  const handleEdit = async (id) => {
    const updateData = await authService.getServiceById(id);
    setServiceData(updateData.service);
  };

  const getserviceDetails = async () => {
    const response = await authService.getAllService();
    if (response.services) {
      setServiceDetails(response.services);
    }
  };

  useEffect(() => {
    getserviceDetails();
  }, []);

  return (
    <DefaultLayout>
      <>
        <Breadcrumb pageName="Services" />
        <div className="grid grid-cols-2 gap-9 border rounded-lg p-6 bg-white dark:bg-gray-800 dark:text-white">
          {/* Left Column (4 fields) */}
          <div className="flex flex-col gap-5.5">
            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Service Name
              </label>
              <input
                type="text"
                name="service_name"
                value={serviceData.service_name}
                onChange={handleInputChange}
                placeholder="Enter service name"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Min Price
              </label>
              <input
                type="text"
                name="service_min_price"
                value={serviceData.service_min_price}
                onChange={handleInputChange}
                placeholder="Enter min price"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Max Price
              </label>
              <input
                type="text"
                name="service_max_price"
                value={serviceData.service_max_price}
                onChange={handleInputChange}
                placeholder="Enter max price"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="service_title"
                value={serviceData.service_title}
                onChange={handleInputChange}
                placeholder="Enter title"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
          </div>

          {/* Right Column (3 fields) */}
          <div className="flex flex-col gap-5.5">
            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Description
              </label>
              <input
                type="text"
                name="service_description"
                value={serviceData.service_description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Attachment
              </label>
              <input
                type="file"
                name="service_attachment"
                value={serviceData.service_attachment}
                onChange={handleInputChange}
                placeholder="Enter attachment"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Active Status
              </label>
              <div className="flex items-center gap-4">
                <label htmlFor="active" className="text-black dark:text-white">
                  Yes
                </label>
                <input
                  type="radio"
                  id="active"
                  name="active_yn"
                  value="Y"
                  checked={serviceData.active_yn === 'Y'}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="inActive"
                  className="text-black dark:text-white"
                >
                  No
                </label>
                <input
                  type="radio"
                  id="inActive"
                  name="active_yn"
                  value="N"
                  checked={serviceData.active_yn === 'N'}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Submit
            </button>
          </div>
        </div>

        {/* table here */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-6">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Service Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Min Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Max Price
                </th>

                <th scope="col" className="px-6 py-3">
                  Title
                </th>

                <th scope="col" className="px-6 py-3">
                  Description
                </th>

                <th scope="col" className="px-6 py-3">
                  Attachment
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
              {serviceDetails.map((serviceItem, key) => (
                <tr
                  key={serviceItem.service_types_id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {serviceItem.service_name}
                  </th>
                  <td className="px-6 py-4">{serviceItem.service_min_price}</td>
                  <td className="px-6 py-4">{serviceItem.service_max_price}</td>
                  <td className="px-6 py-4">{serviceItem.service_title}</td>
                  <td className="px-6 py-4">
                    {serviceItem.service_description}
                  </td>
                  <td className="px-6 py-4">
                    {serviceItem.service_attachment}
                  </td>

                  <td className="px-6 py-4">
                    {serviceItem.active_yn === 'Y' ? 'Active' : 'InActive'}
                  </td>

                  <td className="px-6 py-4">
                    <span>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(serviceItem.service_types_id);
                        }}
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </>
    </DefaultLayout>
  );
};

export default Service;
