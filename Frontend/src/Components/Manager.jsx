import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const passwordref = useRef();
    const ref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);

    const getpasaword = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        console.log(passwords);
        setpasswordArray(passwords);
    }

    useEffect(() => {
        getpasaword();
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard', { position: "top-right", autoClose: 3000 });
        navigator.clipboard.writeText(text);
    }

    const showpassword = () => {
        if (ref.current.src.includes("Icons/crosseye.svg")) {
            ref.current.src = "Icons/eye.svg";
            passwordref.current.type = "text";
        } else {
            passwordref.current.type = "password";
            ref.current.src = "Icons/crosseye.svg";
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // delete existing if editing
            if (form.id) {
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: form.id })
                });
            }

            toast('Password Saved', { position: "top-right", autoClose: 3000 });
            const newPassword = { ...form, id: uuidv4() };
            setpasswordArray([...passwordArray, newPassword]);

            let res = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword)
            });
            console.log(await res.json());

            setform({ site: "", username: "", password: "" });
        }
        else {
            toast('Please fill all the fields with more than 3 characters', { position: "top-right", autoClose: 3000 });
        }
    }

    const deletePassword = async (id) => {
        let c = window.confirm("Are you sure you want to delete this password?");
        if (c) {
            toast('Password Deleted', { position: "top-right", autoClose: 3000 });
            setpasswordArray(passwordArray.filter((item) => item.id !== id));

            let res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            console.log(await res.json());
        }
    }

    const editPassword = (id) => {
        setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
        setpasswordArray(passwordArray.filter((item) => item.id !== id));
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} theme="light" />

            {/* Responsive container */}
            <div className="mx-auto bg-transparent px-4 sm:px-8 md:px-16 lg:px-40 py-8 sm:py-12 lg:py-16">

                {/* Logo */}
                <div className="logo font-bold text-lg sm:text-xl lg:text-2xl text-center">
                    <span className="text-purple-400">&lt;</span>
                    Pass<span className="text-purple-400">Op/</span>
                    <span className="text-purple-400">&gt;</span>
                </div>
                <p className="text-green-700 text-base sm:text-lg text-center">
                    Your Own password manager
                </p>

                {/* Input section */}
                <div className="text-white flex flex-col mt-6 items-center gap-4">
                    <input
                        value={form.site} onChange={handlechange} name='site'
                        className="rounded-full border border-green-500 w-full sm:w-3/4 lg:w-1/2 p-2 px-4 text-black"
                        type="text"
                        placeholder="Enter website"
                    />

                    <div className="flex flex-col md:flex-row gap-3 w-full sm:w-3/4 lg:w-1/2">
                        <input
                            value={form.username} onChange={handlechange} name='username'
                            className="rounded-full border border-green-500 w-full p-2 px-4 text-black"
                            type="text"
                            placeholder="Enter username"
                        />
                        <div className="relative w-full">
                            <input
                                value={form.password} onChange={handlechange} name='password'
                                className="rounded-full border border-green-500 w-full p-2 px-4 text-black pr-12"
                                type="password" ref={passwordref}
                                placeholder="Enter password"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 cursor-pointer" onClick={showpassword}>
                                <img src="Icons/eye.svg" ref={ref} alt="show password" className="w-5 h-5" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className="rounded-full border border-green-500 bg-green-300 font-bold px-6 py-2 mt-4 flex gap-2 text-black items-center hover:bg-green-500 hover:text-white transition duration-300">
                        <animated-icons
                            src="https://animatedicons.co/get-icon?name=Plugin&style=minimalistic&token=c35872bb-2ea9-4cf2-857b-d402cb8bb06e"
                            trigger="hover"
                            height="30"
                            width="30"
                        ></animated-icons>
                        Save Password
                    </button>
                </div>

                {/* Passwords table */}
                <div className="passwords mt-10">
                    <h2 className='font-bold py-4 text-xl sm:text-2xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <p className='text-green-700'>No passwords saved yet.</p>}

                    {passwordArray.length !== 0 &&
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full rounded-md overflow-hidden text-xs sm:text-sm md:text-base">
                                <thead className="bg-green-500 text-white">
                                    <tr>
                                        <th className='py-1 px-1 sm:py-2 sm:px-2 border border-white'>Site</th>
                                        <th className='py-1 px-1 sm:py-2 sm:px-2 border border-white'>Username</th>
                                        <th className='py-1 px-1 sm:py-2 sm:px-2 border border-white'>Passwords</th>
                                        <th className='py-1 px-1 sm:py-2 sm:px-2 border border-white'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center bg-green-100'>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index} className="text-xs sm:text-sm md:text-base">
                                            <td className='py-1 px-1 sm:py-2 sm:px-2 flex items-center justify-center border border-white text-blue-500 whitespace-nowrap'>
                                                <a href={item.site} target='_blank' className="truncate max-w-[80px] sm:max-w-[150px]">{item.site}</a>
                                                <animated-icons
                                                    className='cursor-pointer ml-1 sm:ml-2'
                                                    src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                    trigger="hover"
                                                    height="16"
                                                    width="16"
                                                ></animated-icons>
                                            </td>
                                            <td className='py-1 px-1 sm:py-2 sm:px-2 border border-white'>
                                                <div className='flex items-center justify-center gap-1 sm:gap-2' onClick={() => { copyText(item.username) }}>
                                                    <span className="truncate max-w-[80px] sm:max-w-[150px]">{item.username}</span>
                                                    <animated-icons
                                                        className='cursor-pointer'
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        height="16"
                                                        width="16"
                                                    ></animated-icons>
                                                </div>
                                            </td>
                                            <td className='py-1 px-1 sm:py-2 sm:px-2 border border-white'>
                                                <div className='flex items-center justify-center gap-1 sm:gap-2' onClick={() => { copyText(item.password) }}>
                                                    <span className="truncate max-w-[80px] sm:max-w-[150px]">{"*".repeat(item.password.length)}</span>
                                                    <animated-icons
                                                        className='cursor-pointer'
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        height="16"
                                                        width="16"
                                                    ></animated-icons>
                                                </div>
                                            </td>
                                            <td className='py-1 px-1 sm:py-2 sm:px-2 border border-white'>
                                                <div className='flex items-center justify-center gap-1 sm:gap-2 cursor-pointer'>
                                                    <animated-icons
                                                        onClick={() => { editPassword(item.id) }}
                                                        src="https://animatedicons.co/get-icon?name=edit&style=minimalistic&token=bef79568-d828-4e67-a904-60a1bb446375"
                                                        trigger="click"
                                                        height="18"
                                                        width="18"
                                                    ></animated-icons>
                                                    <animated-icons
                                                        onClick={() => { deletePassword(item.id) }}
                                                        src="https://animatedicons.co/get-icon?name=delete&style=minimalistic&token=c1352b7b-2e14-4124-b8fd-a064d7e44225"
                                                        trigger="click"
                                                        height="16"
                                                        width="16"
                                                    ></animated-icons>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;
