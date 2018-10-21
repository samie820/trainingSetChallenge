import TrainingSet from "../models/trainingSet.model";
import uploadFileToIPFS from "../services/ipfs";

// test controller function
export function test(req, res) {
  res.send("All things work well from my end!!!");
}

// function to upload a single dataset and its label
export const trainingDataCreate = (req, res, next) => {
  uploadFileToIPFS(req.file.buffer, (error, data) => {
    if (error) {
      next(error);
    }
    const { label } = req.body;
    const url = `https://gateway.ipfs.io/ipfs/${data[0].hash}`;
    const trainingSet = new TrainingSet({
      label,
      url,
      hash: data[0].hash
    });

    trainingSet
      .save()
      .then(data => {
        res.status(201).json({
          message: "Training Data Created Successfully",
          data: trainingSet
        });
      })
      .catch(error => {
        return next(error);
      });
  });
};

// function to get a list of all the dataset
export const trainingDataList = (req, res, next) => {
  const { page = 0, limit = 10 } = req.query;
  TrainingSet.find()
    .limit(limit)
    .skip(page * limit)
    .then(data => {
      TrainingSet.count({}).then(count => {
        console.log(count)
        return res.status(200).json({
          paging: {
            "pageCount": page,
            "pageLimit": limit,
            "totalCount": count
          },
          data
        });
      });
    })
    .catch(error => {
      return next(error);
    });
};
