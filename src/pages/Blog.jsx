import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import authService from './Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext';

const Blog = () => {
  const [blogData, setBlogData] = useState({
    id: '',
    blog_title: '',
    blog_sub_title: '',
    blog_description: '',
    blog_img: '',
    author_name: '',
    author_img: '',
    active_yn: '',
  });
  const [blogDetails, setBlogDetails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setBlogData((prev) => ({
          ...prev,
          [name]: reader.result, // Base64 encoded image
        }));
      };
  
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blogData.id) {
        const response = await authService.updateBlog(
          blogData.id,
          blogData,
        );
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      } else {
        const response = await authService.createBlog(blogData);
        if (response?.message) {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
        }
      }
      getBlogDetails();
      setBlogData({
        blog_title: '',
        blog_sub_title: '',
        blog_description: '',
        author_name: '',
        author_img: '',
        blog_img: '',
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
    const updateData = await authService.getBlogById(id);
    setBlogData(updateData.blog);
  };

  const getBlogDetails = async () => {
    const response = await authService.getAllBlogs();
    if (response.blogs) {
      setBlogDetails(response.blogs);
    }
  };


  useEffect(() => {
    getBlogDetails();
  }, []);

  return (
    <DefaultLayout>
      <>
        <Breadcrumb pageName="Blog" />
        <div className="grid grid-cols-2 gap-9 border rounded-lg p-6 bg-white dark:bg-gray-800 dark:text-white">
          {/* Left Column (4 fields) */}
          <div className="flex flex-col gap-5.5">
            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Blog
              </label>
              <input
                type="text"
                name="blog_title"
                value={blogData.blog_title}
                onChange={handleInputChange}
                placeholder="Enter blog name"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Blog Sub Title
              </label>
              <input
                type="text"
                name="blog_sub_title"
                value={blogData.blog_sub_title}
                onChange={handleInputChange}
                placeholder="Enter Blog Sub Title"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Blog Img
              </label>
              <input
                type="file"
                name="blog_img"
                onChange={handleFileChange}
                placeholder="Enter Blog Img"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
          </div>

          {/* Right Column (3 fields) */}
          <div className="flex flex-col gap-5.5">
            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Blog Description
              </label>
              <textarea
                type="text"
                name="blog_description"
                value={blogData.blog_description}
                onChange={handleInputChange}
                placeholder="Enter Blog Description"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Author Name
              </label>
              <input
                type="text"
                name="author_name"
                value={blogData.author_name}
                onChange={handleInputChange}
                placeholder="Enter Author Name"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-black dark:text-white">
                Author Img
              </label>
              <input
                type="file"
                name="author_img"
                onChange={handleFileChange}
                placeholder="Enter Author Img"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5
                 text-black outline-none transition focus:border-primary active:border-primary
                  disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
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
                  checked={blogData.active_yn === 'Y'}
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
                  checked={blogData.active_yn === 'N'}
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
                  Blog Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Blog Sub Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Blog Description
                </th>

                <th scope="col" className="px-6 py-3">
                  Blog Img
                </th>

                <th scope="col" className="px-6 py-3">
                  Author Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Author Img
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
              {blogDetails.map((blogItem, key) => (
                <tr
                  key={blogItem.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {blogItem.blog_title}
                  </th>
                  <td className="px-6 py-4">{blogItem.blog_sub_title}</td>
                  <td className="px-6 py-4">{blogItem.blog_description}</td>
                  <td className="px-6 py-4">{blogItem.blog_img}</td>
                  <td className="px-6 py-4">
                    {blogItem.author_name}
                  </td>
                  <td className="px-6 py-4">{blogItem.author_img}</td>

                  <td className="px-6 py-4">
                    {blogItem.active_yn === 'Y' ? 'Active' : 'InActive'}
                  </td>

                  <td className="px-6 py-4">
                    <span>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(blogItem.id);
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

export default Blog;
