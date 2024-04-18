import React, { useState } from 'react';
import './Generate.css';  

const Generate = () => {
    return (
        <div className="RecipeForm">
            <div>
                <h2>Recipe Preferences</h2>
                <form>
                    <div>
                        <label>
                            Recipe Type:
                            <input 
                                type="text" 
                                placeholder="e.g., vegetarian, non-vegetarian" 
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Ingredients:
                            <input 
                                type="text" 
                                placeholder="e.g., tomatoes, chicken, pasta" 
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Cuisine Type:
                            <input 
                                type="text" 
                                placeholder="e.g., Italian, Mexican" 
                            />
                        </label>
                    </div>
                    <button type="submit">Generate</button>
                </form>
            </div>
        </div>
    );
}

export default Generate;
