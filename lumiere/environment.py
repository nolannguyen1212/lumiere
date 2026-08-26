import os


def settings_module() -> str:
    if os.getenv("ENVIRONMENT") == "production":
        return "lumiere.settings.production"
    return "lumiere.settings.develop"
