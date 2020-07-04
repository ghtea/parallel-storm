
const common = {
    
    color_active: '#00B9FF'
    ,color_neutral: '#888888'
    
    
    
    ,media: {
        mid_big: 920 // 120 + 400 * 2
    }
    
}

export const light ={
    
    ...common,
    
    color_strong: '#000000',
    color_normal: '#222222',
    color_weak: '#666666',
    color_very_weak: '#dddddd',
    
    COLOR_bg: '#f0f0f9',
    
    COLOR_normal: '#f8f8f8'
    
}

export const dark ={
    
    ...common,
    
    color_strong: '#ffffff',
    color_normal: '#dddddd',
    color_weak: '#999999',
    color_very_weak: '#222222',
    
    COLOR_bg: '#000000',
    
    COLOR_normal: '#191920'
    
}
