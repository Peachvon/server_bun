import { userRouter } from "@routes/v1/user_route";
import { healthCheck } from "@controllers/health_check";
import { Elysia, Context } from "elysia";
// const userRouter123 = new Elysia().post("/get-all", g).put("/create", () => {
//   return { name: "peachvoid" };
// });
const g = (c: Context) => {
  c.set.status = "Bad Gateway";
  return { name: "peachvon" };
};

export const router = new Elysia();
router.get("/health-check", healthCheck, {
  detail: {
    tags: ["Health"],
    description: "Health Check",
  },
});

router.group("users", (app) => app.use(userRouter));

// router.use("/auth", authRoutes)

// app.use("/users", userRouter);
// router.use("/admins", adminRoutes);
// protected route
// router.use(verifyToken)
// app.use("/api", routes);
export default router;
