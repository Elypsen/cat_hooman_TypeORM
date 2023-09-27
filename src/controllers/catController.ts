import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cat } from "../entities/Cat";

const catRepository = AppDataSource.getRepository(Cat);

export const createCat = async (req: Request, res: Response) => {
  const newCat = catRepository.create(req.body);
  console.log(req.body);
  try {
    await catRepository.save(newCat);
    res.json(newCat);
  } catch (err) {
    console.log("createCat : ", err.message);
  }
};

export const getCat = async (req: Request, res: Response) => {
  try {
    const cat = await catRepository.findOneBy({ id: req.params.id });
    res.json(cat);
  } catch (err) {
    res.status(404).json({ message: "Cat not Found" });
  }
};

export const getAllCat = async (req: Request, res: Response) => {
  try {
    const cats = await catRepository.find();
    res.json(cats);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const updateCat = async (req: Request, res: Response) => {
  try {
    let cat = await catRepository.findOneBy({ id: req.params.id });
    try {
      Object.assign(cat, req.body);
      await catRepository.save(cat);
      res.json(cat);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const deleteCat = async (req: Request, res: Response) => {
  try {
    const cat = await catRepository.findOneBy({ id: req.params.id });
    try {
      await catRepository.remove(cat);
      res.json(cat);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const addMaster = async (req: Request, res: Response) => {
  try {
    const cat = await catRepository.findOneBy({ id: req.params.id });
    try {
      cat.master = req.body.master_id!;
      await catRepository.save(cat);
      res.json(cat);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};
