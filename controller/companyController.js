const CompanyRepository = require("../repository/CompanyRepository")
const security = require("../src/utils/security");
const createError = require("http-errors");


exports.getCompanies = async(req, res, next)=>{
    try {
        let companies = await CompanyRepository.getCompanies()
        let companies_ = []
        for(let i =0; i < companies.length; i++){
            let detailint = await CompanyRepository.getCompanyDetailsINT(companies[i].dataValues.Id)
            detailstring = await CompanyRepository.getCompanyDetailsSTRING(companies[i].dataValues.Id)
            let detail = detailint.concat(detailstring)
            let company = {
                company: companies[i],
                details: detail
            }
            companies_.push(company)
        }
        res.json(companies_)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.addCompany = async(req, res, next)=>{
    try {
        let params = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            createdby: req.body.createdby
        }
        let company = await CompanyRepository.addCompanyEntity(params)
        if (company){
            let params1 = {
                entity: company.dataValues.Id,
                createdby: req.body.createdby,
                desarrollador: req.body.desarrollador,
                nit: req.body.nit,
                direccion: req.body.direccion,
                contacto: req.body.contacto,
                telefonocontacto: req.body.telefonocontacto,
                gerenteventas: req.body.gerenteventas,
                telefonogerenteventas: req.body.telefonogerenteventas,
                logo: req.body.logo
            }
            let details = await CompanyRepository.addCompanyDetails(params1)
            res.json({
                response: true
            })  
        }
        else{
            res.json({
                response: false
            })  
        }
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.editCompany = async(req, res, next)=>{
    try {
        let params = {
            entity: req.body.id,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            updatedby: req.body.updatedby,
            desarrollador: req.body.desarrollador,
            nit: req.body.nit,
            direccion: req.body.direccion,
            contacto: req.body.contacto,
            telefonocontacto: req.body.telefonocontacto,
            gerenteventas: req.body.gerenteventas,
            telefonogerenteventas: req.body.telefonogerenteventas,
            logo: req.body.logo
        }
        await CompanyRepository.editCompanyEntity(params)
        await CompanyRepository.editCompanyDetails(params)
        res.json({
            response: true
        }) 
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.deleteCompany = async(req, res, next)=>{
    try {
        let params = {
            entity: req.body.id
        }
        params.updatedby = Date.now();

        await CompanyRepository.deleteCompanyEntity(params)
        await CompanyRepository.deleteCompanyDetails(params)
        res.json({
            response: true
        }) 
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.getProjectById = async(req, res, next) => {
    try {
        const params = {companyId: req.params.id};

        let companyInfo = await CompanyRepository.getCompanyById(params.companyId)
        let detailint = await CompanyRepository.getCompanyDetailsINT(params.companyId)
        let detailstring = await CompanyRepository.getCompanyDetailsSTRING(params.companyId)
        let detail = detailint.concat(detailstring)

        if(!detailint || !detailstring) {
            return res.json({response: false, company: null, message: "The company Id doesn't exist. verify your ID" })
        }

        let company = {
            company: companyInfo,
            details: detail
        };

        res.json({
            response: true,
            message: "",
            company,
        })

    } catch (error) {
        console.log("🤖🤖🤖🤖 ERROR get company by ID",error)
        next(createError(500))
    }
}

