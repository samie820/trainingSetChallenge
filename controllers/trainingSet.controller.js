import TrainingSet, { find } from "../models/trainingSet.model";

// test controller function
export function test(req, res) {
  res.send("All things work well from my end!!!");
}

export const trainingDataCreate = (req, res, next) => {
  const { label, url } = req.body;
  const trainingSet = new TrainingSet({
    label,
    url
  });

  trainingSet
    .save()
    .then(data => {
      res.status(201).json({
        message: "Training Data Created Successfully"
      });
    })
    .catch(error => {
      return next(error);
    });
};

export const trainingDataList = (req, res, next) => {
  const { page = 0, limit = 10 } = req.query;
  TrainingSet.find()
    .limit(limit)
    .skip(page * limit)
    .then(data => {
      return res.status(200).json({
        paging: {
          "page-count": page,
          "page-limit": limit,
        },
        data
      });
    })
    .catch(error => {
      return next(error);
    });
};
