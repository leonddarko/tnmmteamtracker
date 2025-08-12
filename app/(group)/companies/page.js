import { getServerSession } from "next-auth"
import userAccess from "@/app/lib/getUserAccess"
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import AddCompanyModal from "@/app/ui/addcompanymodal";
import CompaniesTable from "@/app/ui/companiestable";
import AddBrandModal from "@/app/ui/addbrandmodal";
import getCompanies from "@/app/lib/getCompanies";
import getAllBrands from "@/app/lib/getBrands";
import getAllVariants from "@/app/lib/getVariants";
import BrandsTable from "@/app/ui/brandstable";
import AddBrandVariantModal from "@/app/ui/addvariantmodal";
import VariantsTable from "@/app/ui/variantstable";


export default async function Company() {
    const session = await getServerSession()
    const useraccess = await userAccess(session.user.email);

    const companies = await getCompanies();
    const brands = await getAllBrands();
    const variants = await getAllVariants();

    // Convert data to a plain object
    const Companies = JSON.parse(JSON.stringify(companies));
    const Brands = JSON.parse(JSON.stringify(brands));
    const Variants = JSON.parse(JSON.stringify(variants));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white shadow-sm overflow-scroll">
                {useraccess !== "Admin" && (
                    <UnauthorizedAccess />
                )}

                {useraccess === "Admin" && (
                    <>
                        <div className="mb-10">
                            <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                                <div>
                                    <h1 className=" text-3xl text-cyan-950 font-notosans font-bold">Companies, Brands & Variants</h1>
                                    <span className="label-text text-cyan-950">Add a <span className=" font-medium text-cyan-950">Company, View all Companies</span> or <span className="font-medium text-red-700">Delete a Company </span>here.</span>
                                </div>
                                <div className="flex flex-wrap justify-end items-start gap-2">
                                    <AddCompanyModal />
                                    <AddBrandModal Companies={Companies} />
                                    <AddBrandVariantModal Companies={Companies} />
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-between items-start gap-5 flex-wrap">
                            <CompaniesTable />
                            <BrandsTable Companies={Companies} Brands={Brands} />
                            <VariantsTable Companies={Companies} Variants={Variants} />
                        </div>
                    </>
                )}
            </div>
        </>
    )

}