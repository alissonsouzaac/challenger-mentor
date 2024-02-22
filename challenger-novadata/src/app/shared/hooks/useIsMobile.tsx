import { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // Defina o limite de largura para identificar dispositivos móveis
    }
    // Verifica o tamanho da janela sempre que a janela for redimensionada
    window.addEventListener('resize', handleResize);

    // Executa a verificação inicialmente
    handleResize();

    // Remove o event listener quando o componente é desmontado para evitar vazamentos de memória
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

export default useIsMobile;
