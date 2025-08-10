"""
Business logic for engineering calculations
"""
from typing import Dict
from app.models.schemas import (
    BoxDimensions, BoxCalculationResult, DimensionDisplay,
    BasicCalculations, GeometryInfo, PracticalInfo, MaterialCostResult
)

class CalculatorService:
    """Service class for engineering calculations"""
    
    @staticmethod
    def calculate_box_properties(dimensions: BoxDimensions) -> BoxCalculationResult:
        """
        Calculate comprehensive box properties
        """
        l, w, h = dimensions.length, dimensions.width, dimensions.height
        
        # Basic calculations
        surface_area = 2 * ((l * w) + (l * h) + (w * h))
        volume = l * w * h
        
        # Unit conversions
        surface_area_sqft = surface_area / 144  # sq inches to sq feet
        volume_cuft = volume / 1728  # cu inches to cu feet
        volume_liters = volume * 0.0163871  # cu inches to liters
        
        # Additional geometry
        perimeter_base = 2 * (l + w)
        diagonal = (l**2 + w**2 + h**2)**0.5
        
        # Practical applications
        paint_needed = surface_area / 350  # rough estimate: 350 sq in per oz
        cardboard_sheets = surface_area / 144  # assuming 12x12 inch sheets
        
        # Weight estimates for different materials (rough estimates in pounds)
        weight_estimates = {
            'Cardboard': round(volume * 0.01, 1),
            'Wood': round(volume * 0.03, 1),
            'Steel': round(volume * 0.28, 1),
            'Plastic': round(volume * 0.02, 1)
        }
        
        # Size comparison
        comparisons = CalculatorService._get_size_comparison(volume_liters)
        
        return BoxCalculationResult(
            dimensions=DimensionDisplay(
                length=l,
                width=w,
                height=h,
                length_ft=CalculatorService._inches_to_feet_inches(l),
                width_ft=CalculatorService._inches_to_feet_inches(w),
                height_ft=CalculatorService._inches_to_feet_inches(h)
            ),
            basic_calculations=BasicCalculations(
                surface_area_sqin=round(surface_area, 2),
                surface_area_sqft=round(surface_area_sqft, 2),
                volume_cuin=round(volume, 2),
                volume_cuft=round(volume_cuft, 2),
                volume_liters=round(volume_liters, 2)
            ),
            geometry=GeometryInfo(
                perimeter_base=round(perimeter_base, 2),
                diagonal=round(diagonal, 2)
            ),
            practical=PracticalInfo(
                paint_needed_oz=round(paint_needed, 1),
                cardboard_sheets=round(cardboard_sheets, 1),
                weight_estimates=weight_estimates
            ),
            comparisons=comparisons
        )
    
    @staticmethod
    def calculate_material_cost(surface_area: float, material: str = "cardboard") -> MaterialCostResult:
        """
        Calculate estimated material costs
        """
        costs_per_sqft = {
            'cardboard': 0.50,
            'plywood': 2.00,
            'plastic': 1.50,
            'metal': 5.00,
            'acrylic': 3.00
        }
        
        surface_area_sqft = surface_area / 144
        cost = surface_area_sqft * costs_per_sqft.get(material.lower(), 0.50)
        
        return MaterialCostResult(
            material=material,
            surface_area_sqft=round(surface_area_sqft, 2),
            estimated_cost=round(cost, 2)
        )
    
    @staticmethod
    def _inches_to_feet_inches(inches: float) -> str:
        """Convert inches to feet and inches format"""
        feet = int(inches // 12)
        remaining_inches = inches % 12
        return f"{feet}' {remaining_inches:.1f}\""
    
    @staticmethod
    def _get_size_comparison(volume_liters: float) -> str:
        """Provide relatable size comparisons"""
        if volume_liters < 1:
            return "About the size of a small water bottle."
        elif volume_liters < 10:
            return "About the size of a large water bottle or small shoebox."
        elif volume_liters < 50:
            return "About the size of a medium storage box or small microwave."
        elif volume_liters < 200:
            return "About the size of a large storage container or mini fridge."
        elif volume_liters < 500:
            return "About the size of a standard refrigerator."
        elif volume_liters < 1000:
            return "About the size of a large appliance or small room."
        else:
            return "That's a very large box - like a walk-in closet!"

# Additional utility functions
def format_number(num: float, decimals: int = 2) -> str:
    """Format numbers for display"""
    return f"{num:,.{decimals}f}"

def get_material_options() -> Dict[str, str]:
    """Get available material options with descriptions"""
    return {
        "cardboard": "Corrugated cardboard - lightweight, recyclable",
        "plywood": "Plywood sheets - sturdy, good for construction",
        "plastic": "Plastic sheets - waterproof, durable",
        "metal": "Metal sheets - heavy duty, industrial",
        "acrylic": "Acrylic sheets - clear, professional appearance"
    }
