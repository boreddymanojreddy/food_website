import express from "express";
const router = express.Router();

// Menu routes
router.get("/menu", async (req, res) => {
  try {
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/menu/:id", async (req, res) => {
  try {
    const menuItem = menuItems.find((item) => item._id === req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
