import mongoose from "mongoose";

const subscription = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      minlength: 3,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be grater than 0"],
    },
    currency: {
      type: Number,
      enum: ["BDT", "USD", "EURO"],
      default: "BDT",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    catagroy: {
      type: Number,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      default: "BDT",
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start Date must be in Past",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          return value > this.startDate;
        },
        message: "Renewal date must be after the Start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
  },
  { Timestamp: true }
);

// Calculating renewal date
subscription.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }
  // Auto update status if renewal expired
  if (!this.renewalDate < new Date()) this.status = "expired";
  next()
});

const subscriptionSchema = mongoose.model("subscriptionSchema", subscription);
export default subscriptionSchema;
