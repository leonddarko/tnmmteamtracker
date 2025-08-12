"use client"

import { Banknote, CloudUpload, Plus, Text, TimerIcon, User2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { languages, products } from "../lib/data";
import { useSession } from "next-auth/react"
import axios from "axios";
import ToastAlert from "./toast";
import Image from "next/image";

export default function DataEntryForm({ UserID, User, Industries, Companies }) {
    const { data: session, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);


    const [saving, setsaving] = useState(false);
    const [entrysaved, setentrysaved] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const [stations, setStations] = useState([]);


    const [industryID, setindustryID] = useState("")
    const [industryName, setIndustryName] = useState('');
    const [industryCategories, setIndustryCategories] = useState([]);

    const [companyID, setcompanyID] = useState("")
    const [companyName, setCompanyName] = useState('');
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        if (!UserID) return;
        axios.get(`/api/user-stations?userId=${UserID}`).then(res => {
            setStations(res.data);
        });
    }, [session]);

    // Fetching Categories by passing industryID
    useEffect(() => {
        if (!industryID) return;

        const fetchCategories = async () => {
            const res = await fetch(`/api/categories?industry=${industryID}`);
            const data = await res.json();
            setIndustryCategories(data.categories || []);
        };

        fetchCategories();
    }, [industryID]);


    // Fetching Brands and Variants by passing companyID
    useEffect(() => {
        if (!companyID) return;

        const fetchBrandsVariants = async () => {
            const res = await fetch(`/api/brandsvariants?company=${companyID}`);
            const data = await res.json();
            setBrands(data.brands || []);
            setVariants(data.variants || []);
        }

        fetchBrandsVariants();

    }, [companyID])


    const [currentTime, setCurrentTime] = useState("");
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

        const station = event.target.station.value;
        const date = event.target.date.value;
        const timestamp = event.target.timestamp.value;
        const title = event.target.title.value;

        const product = event.target.product.value;
        const duration = event.target.duration.value;
        const language = event.target.language.value;
        const program = event.target.program.value;
        const rate = event.target.rate.value;

        const industry = industryName;
        const category = event.target.category.value;

        const company = companyName;
        const brand = event.target.brand.value;
        const variant = event.target.variant.value;

        const country = event.target.country.value;
        const timesubmitted = event.target.timesubmitted.value;
        const user = event.target.user.value;

        const data = {
            station,
            date,
            timestamp,
            title,
            product,
            duration,
            language,
            program,
            rate,
            industry,
            category,
            company,
            brand,
            variant,
            country,
            timesubmitted,
            user,
        }


        // console.log(data);
        // setsaving(false);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/saveentry";

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: "POST",
            // Tell the server we're sending JSON.
            headers: {
                "Content-Type": "application/json",
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API and get a response.
        const response = await fetch(endpoint, options);

        // Get the response data from server as JSON.
        const result = await response.json();
        console.log(result);

        if (result.okay) {
            setentrysaved(true)
            setsaving(false)
            // event.target.reset();
            // setTimeout(() => { location.reload(true); }, 1000);
        } else {
            setinternalerror(true)
            setsaving(false)
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>

                <div className="flex flex-wrap justify-between items-center gap-5 mb-5">
                    {/* Station Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                        </div>
                        <select name="station" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select Station</option>
                            {stations.map((station) => (
                                <option key={station._id} className="text-sm" value={station.name}>{station.name}</option>
                            ))}
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
                        required
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
                    <div>
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

                    {/* Rate Selection */}
                    <div className="">
                        <label className="input input-sm flex items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Banknote size={20} className="text-cyan-950" />
                            <input name="rate" type="number" min={0} className="grow font-semibold text-black" placeholder="Rate" required />
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">
                    {/* Industry */}
                    <div>
                        <select
                            name="industry"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required
                            defaultValue=""
                            onChange={(e) => {
                                const selectedID = e.target.value;
                                setindustryID(selectedID);
                                const selectedIndustry = Industries.find(item => item._id === selectedID);
                                setIndustryName(selectedIndustry?.industry || '');
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
                        <select
                            name="company"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required
                            defaultValue=""
                            onChange={(e) => {
                                const selectedID = e.target.value;
                                setcompanyID(selectedID);
                                const selectedCompany = Companies.find(item => item._id === selectedID);
                                setCompanyName(selectedCompany?.company || '')
                            }}
                        >
                            <option className="text-xs" value="" disabled>Select Company </option>
                            {Companies.map((item) => (
                                <option key={item._id} className="text-sm" value={item._id}>
                                    {item.company} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand Generic Selection*/}
                    <div>
                        <select name="brand" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>
                                {!companyID ? "Select Company first" : "Select Brand Generic"}
                            </option>
                            {brands.map((brand, idx) => (
                                <option key={idx} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand Variant Selection*/}
                    <div>
                        <select name="variant" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>
                                {!companyID ? "Select Company first" : "Select Brand Variant"}
                            </option>
                            {variants.map((vari, idx) => (
                                <option key={idx} value={vari}>
                                    {vari}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">
                    <div className="flex justify-start items-center gap-2">
                        {session && (
                            <>
                                <Image
                                    className={`${session.user.country !== "Ghana" && "hidden"} rounded-sm`}
                                    src="https://flagcdn.com/w40/gh.png"
                                    width={20}
                                    height={20}
                                    alt="Ghana"
                                />
                                <Image
                                    className={`${session.user.country !== "Nigeria" && "hidden"} rounded-sm`}
                                    src="https://flagcdn.com/w40/ng.png"
                                    width={20}
                                    height={20}
                                    alt="Nigeria"
                                />
                                <Image
                                    className={`${session.user.country !== "Côte d'Ivoire" && "hidden"} rounded-sm`}
                                    src="https://flagcdn.com/w40/ci.png"
                                    width={20}
                                    height={20}
                                    alt="Côte d'Ivoire"
                                />
                            </>
                        )}
                        <select
                            name="country"
                            className="select select-sm w-full rounded-full shadow-sm bg-zinc-100 text-black font-semibold"
                            required defaultValue=""
                        >
                            <option className="text-xs" value={session.user.country}>{session.user.country}</option>

                            {/* {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))} */}
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

            <ToastAlert
                stateVar={entrysaved}
                textColor="text-cyan-950"
                text="Entry saved."
                onClick={() => setentrysaved(false)}
                iconHint="success"
            />

            <ToastAlert
                stateVar={internalerror}
                textColor=" text-red-500"
                text="Something went wrong. Try again."
                onClick={() => setinternalerror(false)}
                iconHint="internalerror"
            />
        </>
    )
}