const contactModel = require("../../models/contact");
var nodemailer = require("nodemailer");

exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;

  const newcontact = await contactModel.create({ name, email, phone, body });

  return res.status(201).json(newcontact);
};

exports.getAll = async (req, res) => {
  const allcontacts = await contactModel.find();
  res.json(allcontacts);
};

exports.asnwer = async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sabzlearnirrrr@gmail.com",
      // pass: "h z v g l t m f l s y v z p h q",
      pass: "r t f p n x v q j x x o p x a o",
    },
  });

  var mailOptions = {
    from: "sabzlearnir@gmail.com",
    to: req.body.email,
    subject: "پاسخ پیغام شما از سمت آکادمی سبزلرن",
    text: req.body.answer,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ message: error });
    } else {
      res.json({ message: "Email sent succesfully :))" });
    }
  });
};
