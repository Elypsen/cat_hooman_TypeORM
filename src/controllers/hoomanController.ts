import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Hooman } from "../entities/Hooman";
import { Cat } from "../entities/Cat";

const catRepository = AppDataSource.getRepository(Cat);
const hoomanRepository = AppDataSource.getRepository(Hooman);

export const createHooman = async (req: Request, res: Response) => {
  const newHooman = hoomanRepository.create(req.body);
  console.log(req.body);
  try {
    await hoomanRepository.save(newHooman);
    res.json(newHooman);
  } catch (err) {
    console.log("createHooman : ", err.message);
  }
};

export const getHooman = async (req: Request, res: Response) => {
  try {
    const Hooman = await hoomanRepository
      .createQueryBuilder("hooman")
      .leftJoinAndSelect("hooman.cats", "cat")
      .where("hooman.id = :id", { id: req.params.id })
      .getOne();
    res.json(Hooman);
  } catch (err) {
    res.status(404).json({ message: "Hooman not Found" });
  }
};

export const getAllHooman = async (req: Request, res: Response) => {
  try {
    const Hoomans = await hoomanRepository.find({ relations: { cats: true } });
    res.json(Hoomans);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const updateHooman = async (req: Request, res: Response) => {
  try {
    const hooman = await hoomanRepository.findOneBy({ id: req.params.id });
    try {
      Object.assign(hooman, req.body);
      await hoomanRepository.save(hooman);
      res.json(Hooman);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const deleteHooman = async (req: Request, res: Response) => {
  try {
    const hooman = await hoomanRepository.findOneBy({ id: req.params.id });
    try {
      await hoomanRepository.remove(hooman);
      res.json(hooman);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const addCats = async (req: Request, res: Response) => {
    try {
        const hooman = await hoomanRepository.findOne({where:{ id: req.params.id}, relations: {cats: true}})
        try{
            const cats = req.body.cats_id;
            const catsPromise = cats.map(async(cat)=> {
              return await catRepository.findOneBy({id: cat})
            })
            const catsData = await Promise.all(catsPromise);
            hooman.cats = [...hooman.cats, ...catsData]
            await hoomanRepository.save(hooman);
            res.json(hooman)
        }catch(err){
            res.status(400).json("ici " + err.message)
        }
    }catch(err){
        res.status(404).json("la " + err.message)
    }
}