"use client"

import { CloudUpload, Plus, Text, TimerIcon, User2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { languages, products } from "../lib/data";
import { countries } from "../lib/data";

export default function DataEntryForm({ User, Industries, Companies }) {
    const [saving, setsaving] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const [industryID, setindustryID] = useState("")
    const [industryCategories, setIndustryCategories] = useState([]);

    console.log(industryID);


    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        if (!industryID) return;

        const fetchCategories = async () => {
            const res = await fetch(`/api/categories?industry=${industryID}`);
            const data = await res.json();
            setIndustryCategories(data.categories || []);
        };

        fetchCategories();
    }, [industryID]);


    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS
            setCurrentTime(formatted);
        };

        updateTime(); // initial call
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setsaving(true);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>

                <div className="flex flex-wrap justify-between items-center gap-5 mb-5">
                    {/* Station Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            {/* <a href="/companies" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a> */}
                        </div>
                        <select name="station" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select Station</option>
                            <option className="text-sm" value="TV3">TV3</option>
                            <option className="text-sm" value="TVXYZ">TVXYZ</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="w-full md:max-w-34">
                        <input
                            name="date"
                            type="date"
                            min="2018-01-01"
                            className="py-1 px-2 text-sm font-semibold rounded-md focus:outline-none shadow-sm bg-cyan-950 text-white"
                            required
                        />
                    </div>

                    {/* Timestamp Selection */}
                    <input
                        name="timestamp"
                        type="time"
                        className="py-0.5 px-1 rounded-md focus:outline-none shadow-sm bg-cyan-950 text-white"
                        step={1}
                    />

                    {/* Title Entry */}
                    <div className="grow">
                        {/* <div className="label">
                            <span className="label-text font-normal text-black">Headline</span>
                        </div> */}
                        <label className="input input-sm flex w-full items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Text size={15} className="text-cyan-700" />
                            <input name="title" type="text" className="grow font-semibold text-black" placeholder="Title" required />
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">
                    {/* Product Selection */}
                    <div>
                        <select name="product" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select Product</option>
                            {products.map((item) => (
                                <option key={item.id} className="text-sm" value={item.product}>{item.product}</option>
                            ))}
                        </select>
                    </div>

                    {/* Duration Selection */}
                    <div className="">
                        <label className="input input-sm flex items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <TimerIcon size={20} className="text-cyan-950" />
                            <input name="duration" type="number" min={0} className="grow font-semibold text-black" placeholder="Duration" required />
                        </label>
                    </div>

                    {/* Language Selection */}
                    <div>
                        <select name="language" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select Language</option>
                            {languages.map((item) => (
                                <option key={item.id} className="text-sm" value={item.language}>{item.language}</option>
                            ))}
                        </select>
                    </div>

                    {/* Program Selection */}
                    <div>
                        <select name="program" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select program</option>
                            <option className="text-sm" value="The Sharks">The Sharks</option>
                            <option className="text-sm" value="News 360">News 360</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">
                    {/* Industry */}
                    <div>
                        <select
                            name="Industry"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required
                            defaultValue=""
                            onChange={(e) => {
                                setindustryID(e.target.value);
                            }}
                        >
                            <option className="text-xs" value="" disabled>Select Industry </option>
                            {Industries.map((item) => (
                                <option key={item._id} className="text-sm" value={item._id}>{item.industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category */}
                    <div>
                        <select name="category" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs text-black" value="" disabled>
                                {!industryID ? "Select Industry first" : "Select Category"}
                            </option>
                            {industryCategories.map((cat, idx) => (
                                <option key={idx} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Company */}
                    <div>
                        <select name="Company" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select Company </option>
                            {Companies.map((item) => (
                                <option key={item._id} className="text-sm" value={item.company}>
                                    {item.company} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand Generic Selection*/}
                    <div>
                        <select name="brandgeneric" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Brand Generic </option>
                            <option className="text-sm" value="Promasidor">Generic</option>
                            <option className="text-sm" value="Telefonika">Generic</option>
                        </select>
                    </div>

                    {/* Brand Variant Selection*/}
                    <div>
                        <select name="brandvariant" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Brand Variant </option>
                            <option className="text-sm" value="Promasidor">Variant</option>
                            <option className="text-sm" value="Telefonika">Variant</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">

                    <div className="flex justify-start items-center gap-2">
                        <i className="fas fa-globe-africa text-cyan-950"></i>
                        <select 
                        name="country" 
                        className="select select-sm w-full rounded-full shadow-sm bg-zinc-100 text-black font-semibold" 
                        required defaultValue=""

                        >
                            <option className="text-xs" value="" disabled>Select your Country</option>
                            {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Time Submitted */}
                    <input
                        name="timesubmitted"
                        type="time"
                        className="py-0.5 px-1 rounded-md focus:outline-none text-sm bg-zinc-50 text-zinc-500"
                        step={1}
                        value={currentTime}
                        disabled
                        required
                    />

                    {/* User */}
                    <div className=" flex justify-start items-center gap-1">
                        <User2 size={15} className="text-cyan-950" />
                        <input
                            name="user"
                            type="text"
                            className="input-md bg-zinc-50 text-cyan-950 rounded-md font-semibold"
                            value={User}
                            disabled
                            required
                        />
                    </div>
                </div>


                {/* Buttons  */}
                <div className="flex justify-between items-center gap-3">
                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                    <div className="flex justify-end items-center gap-3">
                        <button
                            type="reset"
                            className="btn-ghost flex justify-start items-center gap-2 bg-zinc-100 text-cyan-700 rounded-full font-sans font-semibold text-xs p-1">
                            <X size={15} className="" />
                            <span>Clear</span>
                        </button>

                        {saving === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-950 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <CloudUpload size={15} className="" />
                                <span>Save</span>
                            </button>
                        )}

                        {saving === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-900 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Saving...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </>
    )
}