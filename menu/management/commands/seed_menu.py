from django.core.management.base import BaseCommand

from menu.models import MenuItem

MENU_ITEMS = [
    {
        "name": "Seared Foie Gras",
        "category": "Appetizers",
        "price": "28.00",
        "is_chef_special": True,
        "description": "Pan-seared foie gras with brioche toast, fig compote, and a port wine reduction.",
        "image_upload_url": "https://images.unsplash.com/photo-1758972574371-57cf8c42bae8?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Beef Carpaccio",
        "category": "Appetizers",
        "price": "22.00",
        "description": "Thinly sliced tenderloin with arugula, shaved parmesan, and truffle oil.",
        "image_upload_url": "https://images.unsplash.com/photo-1577357573416-3abf4ac6ff9e?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Escargots de Bourgogne",
        "category": "Appetizers",
        "price": "19.00",
        "description": "Snails baked in garlic herb butter, served with a toasted baguette.",
        "image_upload_url": "https://images.unsplash.com/photo-1715018890921-30c621ced2a2?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Tuna Tartare",
        "category": "Appetizers",
        "price": "24.00",
        "description": "Yellowfin tuna with avocado, citrus, and a sesame tuile.",
        "image_upload_url": "https://images.unsplash.com/photo-1779635593350-47a648e174ce?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "French Onion Soup",
        "category": "Soups & Salads",
        "price": "14.00",
        "description": "Caramelized onions in a rich broth, topped with a gruyère crouton.",
        "image_upload_url": "https://images.unsplash.com/photo-1768295982465-ffc2f48e63f4?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Lobster Bisque",
        "category": "Soups & Salads",
        "price": "18.00",
        "is_chef_special": True,
        "description": "Cognac cream bisque finished with chive oil.",
        "image_upload_url": "https://images.unsplash.com/photo-1778104682844-63bf9bf4f3a5?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Heirloom Beet Salad",
        "category": "Soups & Salads",
        "price": "16.00",
        "description": "Roasted beets with goat cheese, candied walnuts, and sherry vinaigrette.",
        "image_upload_url": "https://images.unsplash.com/photo-1765100022784-5e72b418d34b?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Burrata Caprese",
        "category": "Soups & Salads",
        "price": "17.00",
        "description": "Heirloom tomatoes and burrata with basil oil and aged balsamic.",
        "image_upload_url": "https://images.unsplash.com/photo-1760023570385-ee484f7076b3?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Filet Mignon",
        "category": "Main Courses",
        "price": "52.00",
        "is_chef_special": True,
        "description": "8oz center-cut filet with red wine jus, potato gratin, and seasonal vegetables.",
        "image_upload_url": "https://images.unsplash.com/photo-1694345598429-00511c301452?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Pan-Seared Duck Breast",
        "category": "Main Courses",
        "price": "44.00",
        "description": "Duck breast with cherry gastrique and a wild rice pilaf.",
        "image_upload_url": "https://images.unsplash.com/photo-1774921677530-9031f1ea00ec?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Chilean Sea Bass",
        "category": "Main Courses",
        "price": "46.00",
        "description": "Saffron beurre blanc with fennel confit.",
        "image_upload_url": "https://images.unsplash.com/photo-1646658102675-e3647eb64d37?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Rack of Lamb",
        "category": "Main Courses",
        "price": "48.00",
        "description": "Herb-crusted lamb with rosemary jus and ratatouille.",
        "image_upload_url": "https://images.unsplash.com/photo-1761983723667-99c7fd98af53?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Lobster Thermidor",
        "category": "Main Courses",
        "price": "58.00",
        "is_chef_special": True,
        "description": "Butter-poached lobster in a gruyère gratin.",
        "image_upload_url": "https://images.unsplash.com/photo-1775204109618-3fd68eb8f2a6?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Wild Mushroom Risotto",
        "category": "Main Courses",
        "price": "32.00",
        "description": "Truffle and parmesan risotto finished with white wine. Vegetarian.",
        "image_upload_url": "https://images.unsplash.com/photo-1723476662512-6abc972f1167?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Coq au Vin",
        "category": "Main Courses",
        "price": "36.00",
        "description": "Chicken braised in red wine with pearl onions and lardons.",
        "image_upload_url": "https://images.unsplash.com/photo-1689860892307-7db54ab276ba?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Crème Brûlée",
        "category": "Desserts",
        "price": "14.00",
        "description": "Vanilla bean custard with a caramelized sugar crust.",
        "image_upload_url": "https://images.unsplash.com/photo-1779094543236-6c64b71ae14e?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Chocolate Soufflé",
        "category": "Desserts",
        "price": "16.00",
        "is_chef_special": True,
        "description": "Dark chocolate soufflé served with vanilla anglaise.",
        "image_upload_url": "https://images.unsplash.com/photo-1762631883812-b8c598d70449?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Tarte Tatin",
        "category": "Desserts",
        "price": "14.00",
        "description": "Caramelized apple tart with crème fraîche.",
        "image_upload_url": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Paris-Brest",
        "category": "Desserts",
        "price": "15.00",
        "description": "Choux pastry filled with praline cream.",
        "image_upload_url": "https://images.unsplash.com/photo-1761637604739-790197a32073?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Chef's Weekday Lunch Combo",
        "category": "Combos & Set Menus",
        "price": "38.00",
        "description": "Soup or salad, a main course of the day, and coffee. Served Tuesday–Friday until 3pm.",
    },
    {
        "name": "Pre-Theater 3-Course Menu",
        "category": "Combos & Set Menus",
        "price": "65.00",
        "is_chef_special": True,
        "description": "Chef's choice starter, main, and dessert, served promptly for an early evening out.",
    },
    {
        "name": "Sunday Family Set",
        "category": "Combos & Set Menus",
        "price": "95.00",
        "description": "Shared starters, a whole roasted main, and dessert to share. Serves two.",
    },
    {
        "name": "Tasting Menu for Two",
        "category": "Combos & Set Menus",
        "price": "180.00",
        "is_chef_special": True,
        "description": "Five courses built around what's best this week, with wine pairing suggestions for the table.",
    },
    {
        "name": "Sommelier's Red Wine Pairing",
        "category": "Beverages",
        "price": "18.00",
        "description": "A glass selected by our sommelier to complement your meal.",
        "image_upload_url": "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Sommelier's White Wine Pairing",
        "category": "Beverages",
        "price": "16.00",
        "description": "A glass selected by our sommelier to complement your meal.",
        "image_upload_url": "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "Espresso",
        "category": "Beverages",
        "price": "6.00",
        "description": "Double shot of single-origin espresso.",
        "image_upload_url": "https://images.unsplash.com/photo-1616388761741-a5936c6f61f6?w=1200&h=900&fit=crop&auto=format&q=80",
    },
    {
        "name": "French Press Coffee",
        "category": "Beverages",
        "price": "7.00",
        "description": "Freshly ground beans, brewed to order.",
        "image_upload_url": "https://images.unsplash.com/photo-1708127368781-cd5f069a90a5?w=1200&h=900&fit=crop&auto=format&q=80",
    },
]


class Command(BaseCommand):
    help = "Seed (or refresh) the menu with a sample fine-dining menu."

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0
        for item in MENU_ITEMS:
            name = item["name"]
            _, created = MenuItem.objects.update_or_create(
                name=name,
                defaults={
                    "category": item["category"],
                    "price": item["price"],
                    "is_chef_special": item.get("is_chef_special", False),
                    "description": item["description"],
                    "image_upload_url": item.get("image_upload_url", ""),
                    "available": True,
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Seeded {created_count} new and refreshed {updated_count} existing menu item(s).")
        )
